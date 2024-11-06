import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const messages = [
        {
          text: "Hi there!",
          user: "Amando",
          added: new Date()
        },
        {
          text: "Hello World!",
          user: "Charles",
          added: new Date()
        }
      ];

app.get('/', (req, res) => {
    res.render("index", {title: "Mini Messageboard", messages:messages });
});

app.get('/new', (req, res) => {
    res.render("form", {title: "New Message Form"})
});

app.post("/new", (req, res) => {
    const { user, text } = req.body;
    messages.push({
        user,
        text,
        added: new Date()
    });
    res.redirect('/');
});

app.get('/message/:id', (req, res) => {
  const messageId = parseInt(req.params.id, 10);
  
  if (messageId >= 0 && messageId < messages.length) {
      const message = messages[messageId];
      res.render('message', { title: "Message Details", message });
  } else {
      res.status(404).send('Message not found');
  }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
