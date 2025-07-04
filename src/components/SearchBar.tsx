import { useState } from "react";

interface Props {
  onSearch: (texto: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [busqueda, setBusqueda] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(busqueda.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex mb-3">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Buscar receta por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
