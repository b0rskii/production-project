import { useLayoutEffect, useRef, useState } from "react";

export const useGridColumns = ({gap, itemMinWidth, maxColCount}:{
  itemMinWidth: number;
  maxColCount: number;
  gap: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [columns, setColumns] = useState(maxColCount);
  
    useLayoutEffect(() => {
      const grid = ref.current;

      if (!grid) return;

      const observer = new ResizeObserver(() => {
        // ширина контейнера
        const wrapperWidth = grid.clientWidth;
        // количество влезающих элементов с минимальной шириной без учета гэпа
        const cleanItemsCount = Math.floor(wrapperWidth / itemMinWidth);
        // количество влезающих элементов с минимальной шириной с учетом гэпа
        const itemsCountWithGap =
          (wrapperWidth - gap * (cleanItemsCount - 1)) / itemMinWidth;
        // финальное количество колонок
        const columnsCount = Math.min(Math.floor(itemsCountWithGap), maxColCount);
        setColumns(columnsCount);
      });

      observer.observe(grid);
    }, [itemMinWidth, maxColCount, gap]);

    return { gridRef: ref, columns };
};
