const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname));

// 1. 서버에 있는 data.json 읽어오기
app.get('/api/data', (req, res) => {
  if (!fs.existsSync(DATA_FILE)) {
    return res.json({ raw_text: '', updated_at: null });
  }
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('파일 읽기 실패');
    try {
      res.json(JSON.parse(data));
    } catch (e) {
      res.json({ raw_text: '', updated_at: null });
    }
  });
});

// 2. 서버의 html 파일과 동일한 폴더에 data.json 저장하기
app.post('/api/data', (req, res) => {
  const payload = {
    raw_text: req.body.raw_text,
    updated_at: req.body.updated_at
  };
  
  fs.writeFile(DATA_FILE, JSON.stringify(payload, null, 2), 'utf8', (err) => {
    if (err) return res.status(500).send('파일 저장 실패');
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`서버가 성공적으로 실행되었습니다: http://localhost:${PORT}`);
});
