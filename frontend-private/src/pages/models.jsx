import React, { useState } from "react";
import ListModels from "../components/Models/ListModels";
import RegisterModel from "../components/Models/RegisterModel";

const Models = () => {
  const [activeTab, setActiveTab] = useState("list");
  const API = "http://localhost:4000/api/models";
  const [id, setId] = useState("");
  const [nameModel, setNameModel] = useState("");
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchModels = async () => {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Hubo un error al obtener los modelos");
    }
    const data = await response.json();
    setModels(data);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchModels();
  }, []);

  const saveModel = async (e) => {
    e.preventDefault();

    const newModel = {
      name: nameModel,
    };

    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newModel),
    });

    if (!response.ok) {
      alert("Error al guardar el modelo");
      return;
    }

    alert("Modelo guardado correctamente");
    setNameModel("");
    fetchModels();
  };

  const deleteModel = async (modelId) => {
    const response = await fetch(`${API}/${modelId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Error al eliminar el modelo");
      return;
    }

    alert("Modelo eliminado correctamente");
    fetchModels();
  };

  const updateModels = (model) => {
    setId(model._id);
    setNameModel(model.name);
    setActiveTab("form");
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedModel = {
      name: nameModel,
    };

    const response = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedModel),
    });

    if (!response.ok) {
      alert("Error al editar el modelo");
      return;
    }

    alert("Modelo actualizado correctamente");
    setId("");
    setNameModel("");
    setActiveTab("list");
    fetchModels();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Modelos</h1>
        <div>
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
              onClick={() => setActiveTab("list")}
            >
              Lista de modelos
            </button>
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
              onClick={() => {
                setActiveTab("form");
                setNameModel("");
                setId("");
              }}
            >
              Gestionar Modelos
            </button>
          </div>
          <div>
            {activeTab === "list" && (
              <ListModels
                models={models}
                loading={loading}
                deleteModel={deleteModel}
                updateModels={updateModels}
              />
            )}
            {activeTab === "form" && (
              <RegisterModel
                setNameModel={setNameModel}
                nameModel={nameModel}
                saveModel={saveModel}
                id={id}
                handleEdit={handleEdit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Models;