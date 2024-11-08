import { useState, useRef } from 'react';

const useScrollToBottom = () => {
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const scrollRef = useRef(null);

  // 스크롤 위치 확인 함수
  const handleScroll = (isAtBottom: boolean) => {
    setIsAtBottom(isAtBottom);
  };

  // 스크롤을 맨 아래로 이동하는 함수
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollToBottom();
    }
  };

  return { scrollRef, isAtBottom, handleScroll, scrollToBottom };
};

export default useScrollToBottom;
