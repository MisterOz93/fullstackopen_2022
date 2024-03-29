import express from 'express';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));
  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(400);
  }
});

router.post('/', (req, res) => {
  const { date, weather, visibility, comment } = req.body;
  const newDiaryEntry = diaryService.addDiary({
    date,
    weather,
    visibility,
    comment,
  });
  res.json(newDiaryEntry);
});

export default router;
