// import { getDocs, collection } from 'firebase/firestore';
// import { addDoc } from 'firebase/firestore';
// import db from '../../firebase';

// export default async function handler(req, res) {
//   try {
//     const dadosCollection = collection(db, 'dados');

//     if (req.method === 'GET') {
//       const dadosSnapshot = await getDocs(dadosCollection);
//       const dados = dadosSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       if (req.query.id) {
//         const selectedItem = dados.find((item) => item.id === req.query.id);
//         res.status(200).json(selectedItem || {});
//       } else {
//         res.status(200).json(dados);
//       }
//     } else if (req.method === 'POST') {
//       const { nome, dataDeEnvio, email } = req.body;

//       const newDocRef = await addDoc(dadosCollection, {
//         nome,
//         dataDeEnvio,
//         email,
//       });

//       res.status(201).json({ id: newDocRef.id });
//     } else {
//       res.status(405).json({ error: 'Método não permitido' });
//     }
//   } catch (error) {
//     console.error('Erro ao buscar/adicionar dados:', error);
//     res.status(500).json({ error: 'Erro ao buscar/adicionar dados.' });
//   }
// }

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
      const dadosSnapshot = await getDocs(dadosCollection);
      const dados = dadosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (req.query.id) {
        const selectedItem = dados.find((item) => item.id === req.query.id);
        res.status(200).json(selectedItem || {});
      } else {
        res.status(200).json(dados);
      }
    } else if (req.method === "POST") {
      const { nome, dataDeEnvio, email } = req.body;

      const newDocRef = await addDoc(dadosCollection, {
        nome,
        dataDeEnvio,
        email,
      });

      // CODIGO PARA DELETAR DADOS DE ACORDO COM O ID
      res.status(201).json({ id: newDocRef.id });
    } else if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        res.status(400).json({ error: "ID não fornecida para exclusão" });
        return;
      }

      await deleteDoc(doc(dadosCollection, id));

      res.status(200).json({ message: "Documento excluído com sucesso" });
    } else {
      res.status(405).json({ error: "Método não permitido" });
    }
  } catch (error) {
    console.error("Erro ao lidar com a requisição:", error);
    res.status(500).json({ error: "Erro ao lidar com a requisição." });
  }
}
