'use client'
import React, { useEffect, useState, useCallback } from 'react';

const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`); // Example array of items

const InfiniteScrollList = ({items}:{items:any}) => {
  const [visibleItems, setVisibleItems] = useState(items.slice(0, 10)); // Show initial 10 items
  const [hasMore, setHasMore] = useState(true); // Flag to check if more items are available

  // Load more items when the bottom is reached
  const loadMoreItems = useCallback(() => {
    if (!hasMore) return;
    
    const currentLength = visibleItems.length;
    const nextItems = items.slice(currentLength, currentLength + 5);
    
    setVisibleItems((prevItems) => [...prevItems, ...nextItems]);

    if (visibleItems.length + nextItems.length >= items.length) {
      setHasMore(false); // No more items to load
    }
  }, [hasMore, visibleItems.length]);

  // Scroll event listener
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      loadMoreItems();
    }
  }, [loadMoreItems]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div>
      {visibleItems.map((item, index) => (
        <div key={index} style={{ padding: '10px', border: '1px solid #ddd' }}>
          {item}
        </div>
      ))}
      {!hasMore && <p>No more items to load</p>}
    </div>
  );
};

export default InfiniteScrollList;
