import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const [dados, setDados] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await fetch("/api/dados");
        const data = await response.json();
        console.log("Dados buscados:", data);
        setDados(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchDados();
  }, []);

  const deletar = async (id) => {
    const confirmarDelete = window.confirm("Quer mesmo deletar esta empresa?");

    if (confirmarDelete) {
      try {
        await fetch("/api/dados/${id}", { method: "DELETE" });

        const novosDados = dados.filter((item) => item.id !== id);
        setDados(novosDados);
      } catch (error) {
        console.error("Erro ao expluir dados: ", error);
      }
    }
  };

  return (
    <div className="main">
      <header className={styles.header}>
        <div className={styles.cabecalho}>
          <Link href="/">
            <h2>→Empresas←</h2>
          </Link>
          <button>
            <Link href="/adicionar">Adicionar Empresas</Link>
          </button>
        </div>
        {dados.map((item) => (
          <div key={item.id}>
            <div className={styles.conteudo}>
              <p>{item.nome}</p>
              <p>{item.dataDeEnvio}</p>
              <div className={styles.elementos}>
                <div className={styles.cor}>status</div>
                <button onClick={() => deletar(item.id)}>Delete</button>
              </div>
              <p>{item.email}</p>
            </div>
          </div>
        ))}
      </header>
    </div>
  );
}
