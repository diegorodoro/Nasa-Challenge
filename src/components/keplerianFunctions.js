// src/components/keplerianFunctions.js

// Constantes necesarias para las fórmulas Keplerianas
const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

// Calcular la posición en la órbita usando los elementos Keplerianos
export function calculateKeplerOrbit(a, e, I, L, w, omega, time) {
  // Convertir ángulos a radianes
  const i = degreesToRadians(I); // Inclinación
  const w_rad = degreesToRadians(w); // Argumento del perihelio
  const omega_rad = degreesToRadians(omega); // Longitud del nodo ascendente
  const M = L - w; // Anomalía media

  // Calcular la anomalía excéntrica (E) usando una aproximación iterativa (Newton-Raphson)
  const E = solveKepler(M, e);

  // Calcular la posición en el plano orbital
  const x_prime = a * (Math.cos(E) - e);
  const y_prime = a * Math.sqrt(1 - e * e) * Math.sin(E);

  // Convertir la posición al sistema de coordenadas 3D del espacio
  const x = (Math.cos(omega_rad) * Math.cos(w_rad) - Math.sin(omega_rad) * Math.sin(w_rad) * Math.cos(i)) * x_prime +
            (-Math.cos(omega_rad) * Math.sin(w_rad) - Math.sin(omega_rad) * Math.cos(w_rad) * Math.cos(i)) * y_prime;

  const y = (Math.sin(omega_rad) * Math.cos(w_rad) + Math.cos(omega_rad) * Math.sin(w_rad) * Math.cos(i)) * x_prime +
            (-Math.sin(omega_rad) * Math.sin(w_rad) + Math.cos(omega_rad) * Math.cos(w_rad) * Math.cos(i)) * y_prime;

  const z = (Math.sin(w_rad) * Math.sin(i)) * x_prime + (Math.cos(w_rad) * Math.sin(i)) * y_prime;

  return { x, y, z };
}

// Resolver la ecuación de Kepler para obtener la anomalía excéntrica
function solveKepler(M, e, tolerance = 1e-6) {
  let E = M; // Valor inicial de E
  let delta = 1;
  while (delta > tolerance) {
    const E_new = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    delta = Math.abs(E_new - E);
    E = E_new;
  }
  return E;
}

// Calcular la posición del planeta en base al tiempo y sus elementos orbitales
export function calculatePosition(planet, time) {
  const { a, e, I, L, w, omega } = planet; // Elementos Keplerianos
  return calculateKeplerOrbit(a, e, I, L, w, omega, time);
}
