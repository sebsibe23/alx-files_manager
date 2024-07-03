/* eslint-disable import/no-named-as-default */
/*
 * This module sets up two Bull queues: one for generating
 * image thumbnails (`fileQueue`) and another for sending
 * welcome emails to users (`userQueue`). It utilizes MongoDB
 * for database operations and promisifies certain file system
 * functions to use with async/await. The `generateThumbnail`
 * function creates thumbnails of specified sizes for uploaded
 * images. The processing functions for each queue handle the
 * respective jobs of thumbnail generation and email sending.
 *
 * Dependencies:
 * - fs: for file system operations
 * - util: for promisifying functions
 * - bull: for job queue management
 * - image-thumbnail: for generating image thumbnails
 * - mongodb: for MongoDB operations
 * - dbClient: custom module for database client
 * - Mailer: custom module for sending emails
 *
 * Two Bull queues:
 * - fileQueue: Processes image thumbnail generation jobs.
 * - userQueue: Processes email sending jobs.
 *
 * Functions:
 * - generateThumbnail(filePath, size): Generates a thumbnail
 *   of a specified width from an image file.
 * - fileQueue.process: Processes jobs for generating thumbnails
 *   for uploaded images.
 * - userQueue.process: Processes jobs for sending welcome emails
 *   to new users.
 *
 * Author: [Your Name]
 * Created: [Creation Date]
 */

import { writeFile } from 'fs';
import { promisify } from 'util';
import Queue from 'bull/lib/queue';
import imgThumbnail from 'image-thumbnail';
import mongoDBCore from 'mongodb/lib/core';
import dbClient from './utils/db';
import Mailer from './utils/mailer';

const writeFileAsync = promisify(writeFile);
const fileQueue = new Queue('thumbnail generation');
const userQueue = new Queue('email sending');

/**
 * Generates the thumbnail of an image with a given width size.
 * @param {String} filePath The location of the original file.
 * @param {number} size The width of the thumbnail.
 * @returns {Promise<void>}
 */
const generateThumbnail = async (filePath, size) => {
  const buffer = await imgThumbnail(filePath, { width: size });
  console.log(`Generating file: ${filePath}, size: ${size}`);
  return writeFileAsync(`${filePath}_${size}`, buffer);
};

fileQueue.process(async (job, done) => {
  const fileId = job.data.fileId || null;
  const userId = job.data.userId || null;

  if (!fileId) {
    throw new Error('Missing fileId');
  }
  if (!userId) {
    throw new Error('Missing userId');
  }
  console.log('Processing', job.data.name || '');
  const file = await (await dbClient.filesCollection())
    .findOne({
      _id: new mongoDBCore.BSON.ObjectId(fileId),
      userId: new mongoDBCore.BSON.ObjectId(userId),
    });
  if (!file) {
    throw new Error('File not found');
  }
  const sizes = [500, 250, 100];
  Promise.all(sizes.map((size) => generateThumbnail(file.localPath, size)))
    .then(() => {
      done();
    });
});

userQueue.process(async (job, done) => {
  const userId = job.data.userId || null;

  if (!userId) {
    throw new Error('Missing userId');
  }
  const user = await (await dbClient.usersCollection())
    .findOne({ _id: new mongoDBCore.BSON.ObjectId(userId) });
  if (!user) {
    throw new Error('User not found');
  }
  console.log(`Welcome ${user.email}!`);
  try {
    const mailSubject = 'Welcome to ALX-Files_Manager by B3zaleel';
    const mailContent = [
      '<div>',
      '<h3>Hello {{user.name}},</h3>',
      'Welcome to <a href="https://github.com/sebsibe23/alx-files_manager">',
      'ALX-Files_Manager</a>, ',
      'a simple file management API built with Node.js by ',
      '<a href="https://github.com/sebsibe23/alx-files_manager">Bezaleel Olakunori</a>. ',
      'We hope it meets your needs.',
      '</div>',
    ].join('');
    Mailer.sendMail(Mailer.buildMessage(user.email, mailSubject, mailContent));
    done();
  } catch (err) {
    done(err);
  }
});
