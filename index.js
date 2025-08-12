const venom = require('venom-bot');
const express = require('express');
const app = express();

app.use(express.json());

let clientInstance;

// Inicia o Venom Bot
venom.create({
  session: 'session-name', // nome da sessão
  multidevice: true        // suporta modo multi-dispositivo
}).then((client) => {
  clientInstance = client;
  console.log('✅ Bot conectado! Escaneie o QR Code no log.');
}).catch(err => console.error('Erro ao iniciar bot:', err));

// Endpoint para enviar mensagem
app.post('/send', async (req, res) => {
  const { to, message } = req.body;
  if (!clientInstance) return res.status(500).json({ error: 'Bot não iniciado ainda' });

  try {
    await clientInstance.sendText(to, message);
    res.json({ status: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`));