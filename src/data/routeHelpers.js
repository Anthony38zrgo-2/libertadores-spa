/**
 * Helpers puros para rutas y turnos.
 * Evitan que un componente publique una ruta o un horario sin estado verified.
 */

export function findVerifiedRoute(routes) {
  return routes.find((route) => route.editorial?.state === "verified") ?? null;
}

export function getConfirmedSchedules(schedules, routeId) {
  return schedules.filter(
    (schedule) => schedule.routeId === routeId && schedule.status === "confirmed",
  );
}

export function sortSchedules(schedules) {
  return [...schedules].sort((a, b) => a.time.localeCompare(b.time));
}
