import React from "react";
import { render } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Detail from "./components/Detail/Detail";

// Mock de los datos del juego para simular el estado de Redux
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock de useParams para simular el id del videojuego
jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

describe("Detail component", () => {
  beforeEach(() => {
    // Configurar los mocks antes de cada prueba
    useSelector.mockClear();
    useDispatch.mockClear();
    useParams.mockClear();
  });

  test("renders game details correctly", () => {
    // Mock del estado de Redux para el detalle del juego
    useSelector.mockReturnValue({
      name: "Test Game",
      image: "test.jpg",
      rating: 9.5,
      genres: [{ name: "Action" }, { name: "Adventure" }],
      released: "2022-01-01",
      platforms: ["PC", "PlayStation 4"],
      description: "<p>Test game description.</p>",
    });

    // Mock del id del videojuego
    useParams.mockReturnValue({ idVideogame: "123" });

    const { getByText, getByAltText } = render(<Detail />);

    // Verificar que los elementos se rendericen correctamente
    expect(getByText("Test Game")).toBeInTheDocument();
    expect(getByAltText("Test Game")).toBeInTheDocument();
    expect(getByText("Rating:")).toBeInTheDocument();
    expect(getByText("9.5")).toBeInTheDocument();
    expect(getByText("Genres:")).toBeInTheDocument();
    expect(getByText("Action")).toBeInTheDocument();
    expect(getByText("Adventure")).toBeInTheDocument();
    expect(getByText("Released:")).toBeInTheDocument();
    expect(getByText("2022-01-01")).toBeInTheDocument();
    expect(getByText("Platforms:")).toBeInTheDocument();
    expect(getByText("PC")).toBeInTheDocument();
    expect(getByText("PlayStation 4")).toBeInTheDocument();
    expect(getByText("Description:")).toBeInTheDocument();
    expect(getByText("Test game description.")).toBeInTheDocument();
  });

  test("renders loading message when game detail is not available", () => {
    // Mock del estado de Redux cuando el detalle del juego no está disponible
    useSelector.mockReturnValue(null);

    // Mock del id del videojuego
    useParams.mockReturnValue({ idVideogame: "123" });

    const { getByText } = render(<Detail />);

    // Verificar que se renderice el mensaje de carga
    expect(getByText("Loading...")).toBeInTheDocument();
  });
});
