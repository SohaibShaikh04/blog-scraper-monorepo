import { Article } from '@/types/article';

// Configure your Laravel backend URL here
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = 'Request failed';
    try {
      const errorData = await response.json();
      message = errorData.error || errorData.message || message;
    } catch {
      message = await response.text().catch(() => message);
    }
    throw new ApiError(response.status, message);
  }
  return response.json();
}

export const articlesApi = {
  /**
   * Fetch all articles from the backend
   * GET /api/articles
   */
  async getAll(): Promise<Article[]> {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<Article[]>(response);
  },

  /**
   * Fetch a single article by ID
   * GET /api/articles/{id}
   */
  async getById(id: number): Promise<Article> {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<Article>(response);
  },

  /**
   * Create a new article
   * POST /api/articles
   */
  async create(data: Omit<Article, 'id' | 'slug' | 'created_at' | 'updated_at'>): Promise<Article> {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<Article>(response);
  },

  /**
   * Update an existing article
   * PUT /api/articles/{id}
   */
  async update(id: number, data: Partial<Article>): Promise<Article> {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<Article>(response);
  },

  /**
   * Delete an article
   * DELETE /api/articles/{id}
   */
  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new ApiError(response.status, 'Failed to delete article');
    }
  },
};

export { ApiError };
