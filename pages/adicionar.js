import styles from "@/styles/Adicionar.module.css";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebase";
import { format, parse } from 'date-fns';
import { useRouter } from "next/router";

const Adicionar = () => {
  const [novaEmpresa, setEmpresa] = useState("");
  const [novaData, setData] = useState("");
  const [novoEmail, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const empresaAdd = async (dataFormatada) => {
    try {
      const dadosCollection = collection(db, "dados");

      await addDoc(dadosCollection, {
        nome: novaEmpresa,
        dataDeEnvio: dataFormatada,
        email: novoEmail,
      });
    } catch (error) {
      console.error("Erro ao adicionar empresa:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (novaEmpresa.trim() === "" || novoEmail.trim() === "" || novaData.trim() === '') {
      setErro("Preencha todos os campos corretamente.");
      return;
    }
  
    setErro("");
  
    // Realizar a formatação da data antes de chamar a função empresaAdd
    const dataFormatada = format(parse(novaData, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
  
    try {
      // Adicionar a empresa apenas se todos os campos estiverem preenchidos corretamente
      await empresaAdd(dataFormatada);
      // Redirecionar apenas após a conclusão bem-sucedida da adição
      router.push("/");
    } catch (error) {
      console.error("Erro ao adicionar empresa:", error);
    }
  };
  

  return (
    <div className={styles.App}>
      <h2>Adicionar empresas</h2>
      <div className={styles.adicionar}>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          <input
            type="name"
            placeholder="Nome da empresa"
            onChange={(e) => setEmpresa(e.target.value)}
            required
          />
          <br />

          <input
            type="date"
            placeholder="Data de inscrição"
            onChange={(e) => setData(e.target.value)}
            required
          />
          <br />

          <input
            type="email"
            name="email"
            placeholder="Email de contato"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          <button type="submit">
            Enviar
          </button>
        </form>
        {erro && <p>{erro}</p>}
      </div>
    </div>
  );
};

export default Adicionar;
