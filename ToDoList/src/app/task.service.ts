import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core'; // Injection de dépendance
import { Observable, of } from 'rxjs';
import { Task } from './task';
// import { TASKS } from './mock-tasks';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})


export class TaskService {

  private tasksUrl = 'api/tasks';

  // Défini l'en-tête dans les requêtes d'enregistrement HTPP
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** Log a TaskService message with the MessageService */
  private log(message: string) {
    this.messageService.add('TaskService: ' + message);
  }


  // _________________________
  // _____ GET ALL TASKS _____
  // -------------------------
  // Toutes les méthodes HttpClient retournent un RxJS Observable de quelque chose
  // HttpClient.get : renvoie le corps de la réponse en tant qu’objet JSON non typé par défaut.
  // <Task[]> : donne un objet résultat typé
  // pipe() : appliquer des Operators (tap, map) qui prennent un Observable en entrée et retournent un Observable
  // catchError() : intercepte un Observable qui a échoué. Il passe l’erreur à un gestionnaire d’erreur qui peut faire ce qu’il veut avec l’erreur.
  // tap : inspecte les valeurs Observable. (map : transforme)
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap(_ => this.log('fetched tasks')),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  // LOCAL STORAGE
  // getTasks() {
  //   let tasks = JSON.parse(localStorage.getItem('tasks'));
  //   return tasks;
  // }


  // __________________________
  // _____ GET TASK BY ID _____
  // --------------------------
  // Retourne 404 si id non trouvé
  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }


  // ____________________________
  // _____ CREATE/POST TASK _____
  // ----------------------------
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      tap((newTask: Task) => this.log(`added task w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }


  // _______________________
  // _____ DELETE TASK _____
  // -----------------------
  deleteTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }


  // ____________________________
  // ----- Gestion d'erreur -----
  // ----------------------------
  // Signale l’erreur et renvoie un résultat inoffensif pour que l’application continue de fonctionner
  // * @param operation : Nom de l'opération qui a échoué.
  // * @param result : valeur optionnelle pour retourner un Observable.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



  // ------------------------------------------
  // ---------- ANCIEN CODE sans BDD ----------
  // ------------------------------------------
  // getTasks(): Observable<Task[]> {
  //   const tasks = of(TASKS);
  //   this.messageService.add('TaskService: fetched tasks');
  //   return tasks;
  // }

  // getTask(id: number): Observable<Task> {
  //   const task = TASKS.find(h => h.id === id)!;
  //   this.messageService.add(`TaskService: fetched task with id=${id}`);
  //   return of(task);
  // }

}
