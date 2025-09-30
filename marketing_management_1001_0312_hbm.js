// 代码生成时间: 2025-10-01 03:12:19
// Import necessary Ionic modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define the base URL for API calls
const API_BASE_URL = 'https://api.example.com/marketing';

/**
 * Service for managing marketing activities
 */
@Injectable({
  providedIn: 'root'
})
export class MarketingManagementService {

  // Constructor injecting HttpClient for making HTTP requests
  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of marketing activities from the server
   * @returns Observable of marketing activities
   */
  getMarketingActivities(): Observable<any> {
    return this.http.get(`${API_BASE_URL}/activities`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Posts a new marketing activity to the server
   * @param activity The marketing activity to be posted
   * @returns Observable of the posted activity
   */
  postMarketingActivity(activity: any): Observable<any> {
    return this.http.post(`${API_BASE_URL}/activities`, activity).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a marketing activity from the server
   * @param id The ID of the marketing activity to be deleted
   * @returns Observable of the deletion result
   */
  deleteMarketingActivity(id: number): Observable<any> {
    return this.http.delete(`${API_BASE_URL}/activities/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles any errors that occur during HTTP requests
   * @param error The error to handle
   * @returns Observable of the error
   */
  private handleError(error: any) {
    // Log the error for debugging purposes
    console.error('An error occurred', error);
    // Return an Observable with a user-friendly error message
    return throwError(error.message || 'Error occurred');
  }
}
