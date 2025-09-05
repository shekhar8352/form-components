/**
 * API utilities for form components
 * This is a placeholder that will be implemented in task 2.2
 */

export const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

export const searchData = async (url, searchTerm, options = {}) => {
  const searchUrl = new URL(url);
  searchUrl.searchParams.append(options.searchParam || 'search', searchTerm);
  
  return fetchData(searchUrl.toString(), options);
};

export const uploadFile = async (url, file, options = {}) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Upload failed! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};