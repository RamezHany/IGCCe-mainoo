import type { News } from '@/interfaces/News';

let dataNews: Array<News> = [];

// This function will be called to load the data
export async function loadNewsData(locale: string): Promise<News[]> {
    try {
        const url =
            locale === 'ar'
                ? 'https://raw.githubusercontent.com/RamezHany/IGCCe-tr/refs/heads/main/news_ar.json'
                : 'https://raw.githubusercontent.com/RamezHany/IGCCe-tr/refs/heads/main/news_en.json';

        const response = await fetch(url);
        const data = await response.json();
        dataNews = data.news;
        return dataNews;
    } catch (error) {
        console.error('Error loading news data:', error);
        return [];
    }
}

// Initial load of data (optional, can be removed if not needed)
if (typeof window !== 'undefined') {
    loadNewsData('en'); // Default to English
}

export { dataNews };