import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "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";

app.post("/ia", async (req, res) => {
  const { cartas } = req.body;

    const prompt = `
      Você é um tarólogo místico.
        Interprete essas cartas: ${cartas.join(", ")}
          Seja misterioso e direto.
            `;

              try {
                  const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
                        method: "POST",
                              headers: {
                                      "Content-Type": "application/json",
                                              "Authorization": `Bearer ${API_KEY}`
                                                    },
                                                          body: JSON.stringify({
                                                                  model: "gpt-4o-mini",
                                                                          messages: [{ role: "user", content: prompt }]
                                                                                })
                                                                                    });

                                                                                        const data = await resposta.json();
                                                                                            res.json({ texto: data.choices[0].message.content });

                                                                                              } catch {
                                                                                                  res.json({ texto: "Erro ao consultar o universo..." });
                                                                                                    }
                                                                                                    });

                                                                                                    app.listen(3000, () => console.log("Servidor rodando 🔮"));