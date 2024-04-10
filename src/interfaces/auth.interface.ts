/**
 * DataStoredInToken
 * 
 * An interface for the data that is stored in the JWT.
 * Typically this would be a minimal set of user properties.
 */
export interface DataStoredInToken {
    id: string;
    // Add other properties as needed, such as role
  }
  
  /**
   * TokenData
   * 
   * An interface for the properties of a JWT.
   */
  export interface TokenData {
    token: string;
    expiresIn: number;
  }
  
  /**
   * RequestWithUser
   * 
   * An extension of the Express Request that adds the user property.
   * The user is added to the request in the authentication middleware.
   */
  export interface RequestWithUser extends Request {
    user: DataStoredInToken;
  }
  
  // You can add more interfaces related to authentication if needed.
  