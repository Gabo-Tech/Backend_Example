// search.controller.ts
import { Request, Response, NextFunction } from 'express';
import SearchService from '../services/search.service';

class SearchController {
  public searchService = new SearchService();

  public search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = req.query; // Assuming the search query is passed as a query parameter
      if (!query) {
        res.status(400).json({ message: 'Search query is required' });
        return;
      }

      const results = await this.searchService.performSearch(query.toString());
      res.status(200).json({ message: 'Search results', data: results });
    } catch (error) {
      next(error);
    }
  };
  public advancedSearch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query, filters, sortBy } = req.query;
      if (!query) {
        res.status(400).json({ message: 'Search query is required' });
        return;
      }

      const results = await this.searchService.performAdvancedSearch(query.toString(), filters, sortBy);
      res.status(200).json({ message: 'Advanced search results', data: results });
    } catch (error) {
      next(error);
    }
  };

  public getSearchAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const analytics = await this.searchService.getSearchAnalytics();
      res.status(200).json({ message: 'Search analytics data', data: analytics });
    } catch (error) {
      next(error);
    }
  };
  // Additional search-related methods can be added here
}

export default SearchController;
