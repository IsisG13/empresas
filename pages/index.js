import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { format, differenceInCalendarDays, parse } from "date-fns";

export default function Home() {
  const [dados, setDados] = useState([]);
  const [dataAtual, setDataAtual] = useState("");
  const router = useRouter();

  const deletar = async (id) => {
    console.log("ID a ser deletado:", id);
  
    const confirmarDelete = window.confirm("Quer mesmo deletar esta empresa?");
  
    if (confirmarDelete) {
      try {
        const response = await fetch(`/api/dados/${id}`, { method: "DELETE" });
  
        if (response.ok) {
          const novosDados = dados.filter((item) => item.id !== id);
          console.log("Novos Dados após a exclusão:", novosDados);
          setDados(novosDados);
        } else {
          const errorMessage = await response.text();
          console.error(`Erro ao excluir dados (HTTP ${response.status}): ${errorMessage}`);
        }
      } catch (error) {
        console.error("Erro ao excluir dados: ", error);
      }
    }
  };  

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

    const currentDate = new Date();
    setDataAtual(format(currentDate, "dd/MM/yyyy"));
  }, []);

  const mudarCor = (dataDeEnvio) => {
    const dataEnvio = parse(dataDeEnvio, "dd/MM/yyyy", new Date());
    const diffEmDias = differenceInCalendarDays(new Date(), dataEnvio);

    console.log("Data de Envio (formatada):", format(dataEnvio, "dd/MM/yyyy"));
    console.log("Data Atual:", format(new Date(), "dd/MM/yyyy"));
    console.log("Diferença em Dias:", diffEmDias);

    if (diffEmDias <= 4) {
      return styles.verde;
    } else if (diffEmDias <= 8) {
      return styles.amarelo;
    } else if (diffEmDias <= 12) {
      return styles.laranja;
    } else if (diffEmDias >= 25) {
      return styles.vermelho;
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
        <p>Data Atual: {dataAtual}</p>
        {dados &&
          dados.map((item) => (
            <div key={item.id}>
              <div className={styles.conteudo}>
                <div className={styles.nomeSite}>
                  <p className={styles.top}>
                    {item.nome}
                    <a href={item.site} target="_blank">
                      <button>Site</button>
                    </a>
                  </p>
                </div>

                <p>{item.dataDeEnvio}</p>
                <p>
                  Tempo que foi enviada:{" "}
                  {differenceInCalendarDays(
                    new Date(),
                    parse(item.dataDeEnvio, "dd/MM/yyyy", new Date())
                  )} dias </p>
                <div className={styles.statusDelete}>
                  <div
                    className={`${styles.elementos} ${mudarCor(
                      item.dataDeEnvio
                    )}`}
                  >
                    styles
                  </div>
                  <button className={styles.deleteButton} onClick={() => deletar(item.id)}> Delete </button>
                  <br />
                </div>
                <p>{item.email}</p>
                <p className={styles.bottom}>
                  {item.telefone} - {item.estado}
                </p>
              </div>
            </div>
          ))}
      </header>
    </div>
  );
}
