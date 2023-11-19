// api.ts
interface Post {
    id: number;
    title: string;
    tags: { name: string }[];
    slug: string;
    content: string;
    account: { name: string };
    commentCount: number;
    viewCount: number;
    voteCount: number;
    createdAt: string;
  }
  
  export const baseUrl = 'http://localhost:8080/api';
  export const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMDM4NDA0Mn0.GiolGkFY74uweBihRIUSoO96I2YQteLbPQOM5eBDtUE';
  
  export const getPosts = async (): Promise<Post[]> => {
    try {
      const response = await fetch(`${baseUrl}/posts/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      const result: Post[] = await response.json();
      return result.reverse();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  export const deletePost = async (postId: number): Promise<void> => {
    try {
      const response = await fetch(`${baseUrl}/admin/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error deleting post: ${response.statusText}`);
      }
  
      const responseData = await response.text();
      if (responseData.includes('Deleted')) {
        console.log(`Post with ID ${postId} has been deleted successfully.`);
        await getPosts(); 
      } else {
        console.error(`Error deleting post: Unexpected response - ${responseData}`);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  