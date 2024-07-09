import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { proyectos } from '../../api/APIS';
import SlideBarInvestigadores from '../SlideBar/SlideBarInvestigadores';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid'
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5
  },
  text: {
    fontSize: 10,
    marginBottom: 2
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    marginVertical: 5
  }
});

const MyDocument = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View>
        <Text style={styles.header}>Proyectos de Investigación CCAI 2024-1</Text>
      </View>
      {data.map((item, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.header}>{`No. Proyecto: ${item.id_proyecto}`}</Text>
          <View style={styles.divider} />
          <Text style={styles.text}>{`Título: ${item.titulo_esp}`}</Text>
          <View style={styles.divider} />
          <Text style={styles.text}>{`Objetivo: ${item.objetivo}`}</Text>
          <View style={styles.divider} />
          <Text style={styles.text}>{`Descripción: ${item.descripcion}`}</Text>
          <View style={styles.divider} />
          <Text style={styles.text}>{`Coordinador: ${item.coordinador_correo}`}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

const PDFPrueba = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');

  const handleOpenModal = (descripcion) => {
    setSelectedDescription(descripcion);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDescription('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await proyectos();
        console.log('Datos recibidos del API:', response);
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    console.log('Data is empty or undefined:', data);
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <div>
      <SlideBarInvestigadores />
      <div className="flex justify-center items-center bg-slate-700">
        <div className="rounded-md relative border shadow-2xl bg-gray-800 border-gray-700 shadow-blue-500/50 p-6">
          <h1 className="font-serif text-lg text-gray-200 text-center pb-6">
            Bienvenido, los proyectos de investigación CCAI 2024-1 son los siguientes:
          </h1>
          <section>
            <div>
              {data.map((item, index) => (
                <div key={index} className="mb-6 p-4 border-b border-gray-700">
                  <h2 className="text-xl font-bold text-gray-200 mb-2">{`No. Proyecto: ${item.id_proyecto}`}</h2>
                  <p className="text-gray-400 mb-1">
                    <span className="font-semibold text-gray-200">Título:</span> {item.titulo_esp}
                  </p>
                  <p className="text-gray-400 mb-1">
                    <span className="font-semibold text-gray-200">Objetivo:</span> {item.objetivo}
                  </p>
                  <p className="text-gray-400 mb-1">
                    <span className="font-semibold text-gray-200">Descripción:</span>{' '}
                    {item.descripcion.length > 100 ? (
                      <>
                        {item.descripcion.substring(0, 100)}...
                        <button
                          onClick={() => handleOpenModal(item.descripcion)}
                          className="text-blue-400 ml-2"
                        >
                          Ver más
                        </button>
                      </>
                    ) : (
                      item.descripcion
                    )}
                  </p>
                  <p className="text-gray-400 mb-1">
                    <span className="font-semibold text-gray-200">Coordinador:</span> {item.coordinador_correo}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <PDFDownloadLink document={<MyDocument data={data} />} fileName="proyectos.pdf">
            {({ loading }) => (
              <button className="mt-4 p-2 bg-blue-600 text-white rounded-md">
                {loading ? 'Generando PDF...' : 'Descargar PDF'}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 max-w-lg max-h-screen overflow-y-auto">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">Descripción completa</h1>
            <p className="mb-3 font-normal text-gray-700">{selectedDescription}</p>
            <button
              onClick={handleCloseModal}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFPrueba;
