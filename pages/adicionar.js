import styles from "@/styles/Adicionar.module.css";;
import { useState } from "react";
import { addDoc, collection } from 'firebase/firestore';
import db from '../firebase';

export default function Adicionar() {
  const [novaEmpresa, setEmpresa] = useState("");
  const [novaData, setData] = useState("");
  const [novoEmail, setEmail] = useState("");

  const empresaAdd = async () => {
    try {
      const dadosCollection = collection(db, 'dados');

      await addDoc(dadosCollection, {
        nome: novaEmpresa,
        dataDeEnvio: novaData,
        email: novoEmail,
      });

      window.location.href = "/";
    } catch (error) {
      console.error('Erro ao adicionar empresa:', error);
    }
  };

  return (
    <div className={styles.App}>
      <h2>Adicionar empresas</h2>
      <div className={styles.adicionar}>
        <input
          placeholder="Nome da empresa"
          onChange={(e) => setEmpresa(e.target.value)}
          required
        />
        <br />

        <input
          placeholder="Data de inscrição"
          onChange={(e) => setData(e.target.value)}
          required
        />
        <br />

        <input
          placeholder="Email de contato"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <button onClick={empresaAdd} type="submit">Enviar</button>
      </div>
    </div>
  );
}
