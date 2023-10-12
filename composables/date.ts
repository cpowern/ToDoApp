import { ToDo } from "~/core/todo.type"

/**
 * Formats date to a "yyyy-mm-dd" string
 * @param date - Date which shall be formated
 * @returns {string} - formated string
 */
export function formatDate(date: Date): string {
  console.log(date.toISOString().slice(0, 10))
  return date.toISOString().slice(0, 10)
}

/**
 * 
 * @param date 
 * @returns 
 */
export function printDate(date: Date): string {
  return date
    .toLocaleDateString('de-ch', {
      timeZone: 'Europe/Zurich',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .slice(0, 10)
}

/**
 * 
 * @param todos 
 */
export function sortByDate(todos: ToDo[]): ToDo[] {
  return todos.sort((a: ToDo, b: ToDo) => {
    if (a.todoDate === undefined) {
      return 1
    } else if (b.todoDate === undefined) {
      return -1
    } else if (a.todoDate <= b.todoDate) {
      return -1
    } else {
      return 1
    }
  })
}