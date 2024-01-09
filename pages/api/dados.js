import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "../../firebase";

export default async function handler(req, res) {
  try {
    const dadosCollection = collection(db, "dados");

    if (req.method === "GET") {
      const { id } = req.query;

      if (id) {
        const dadosSnapshot = await getDocs(dadosCollection);
        const dados = dadosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // Aqui ele retorna os dados de acordo com a ID
        const selectedItem = dados.find((item) => item.id === id);
        res.status(200).json(selectedItem || {});
      } else {
        // Aqui ele vai retornar todos os dados
        const dadosSnapshot = await getDocs(dadosCollection);
        const dados = dadosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        res.status(200).json(dados);
      }
    } else if (req.method === "POST") {
      const { nome, dataDeEnvio, email, telefone, estado, site } = req.body;
      const newDocRef = await addDoc(dadosCollection, {
        nome,
        dataDeEnvio,
        email,
        telefone,
        estado,
        site,
      });
      res.status(201).json({ id: newDocRef.id });
    } else if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        res.status(400).json({ error: "ID não fornecida para exclusão" });
        return;
      }

      try {
        const docRef = doc(dadosCollection, id);
        await deleteDoc(docRef);

        console.log("Documento excluído com sucesso");
        res.status(200).json({ message: "Documento excluído com sucesso" });
      } catch (error) {
        console.error("Erro ao excluir documento:", error);
        res.status(500).json({ error: "Erro ao excluir documento" });
      }
    } else {
      res.status(405).json({ error: "Método não permitido" });
    }
  } catch (error) {
    console.error("Erro ao lidar com a requisição:", error);
    res.status(500).json({ error: "Erro ao lidar com a requisição." });
  }
}
