import { List } from "react-virtualized";
import AutoSizer from "react-virtualized-auto-sizer";

export default function VirtualizerRow()
{
    const Row = ({
        index,
        style,
      }: {
        index: number;
        style: React.CSSProperties;
      }) => {
           return <></>
      };
    
      return <>
           <AutoSizer style={{ height: "inherit", width: "inherit" }}>
           {({ height, width }) => (

             <></>
           )}
      </AutoSizer>
      </>
}

