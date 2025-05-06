import React from "react";

const RegisterModel = ({ setNameModel, nameModel, saveModel, id, handleEdit }) => {
  return (
    <div className="">
      <form className="w-full max-w-lg mx-auto mt-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="name"
          >
            Nombre Modelo {nameModel} {id}
          </label>
          <input
            type="text"
            name="name"
            value={nameModel}
            onChange={(e) => setNameModel(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Nombre del modelo"
          />
        </div>

        {!id ? (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={(e) => {
              saveModel(e);
            }}
          >
            Guardar
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={(e) => {
              handleEdit(e);
            }}
          >
            Editar
          </button>
        )}
      </form>
    </div>
  );
};

export default RegisterModel;