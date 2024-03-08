const API_URL = 'https://api-brain-cards.glitch.me';

export const fetchCategory = async () => {
  try {
    const response = await fetch(`${API_URL}/api/category`);

    if (response.status === 200 || response.status === 201) {
      const categories = await response.json();

      return categories;
    } else {
      const error = await response.json();

      throw error;
    }
  } catch (error) {
    return { error };
  }
};

export const fetchCards = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/category/${id}`);

    if (response.status === 200 || response.status === 201) {
      const cards = await response.json();

      return cards;
    } else {
      const error = await response.json();

      throw error;
    }
  } catch (error) {
    return { error };
  }
};