import React, { useState } from 'react';  
import { ExpandMore, ExpandLess } from '@mui/icons-material';

export default function Accordion () {
    type BookProps = {
        title: string;
        content: string;      
    };
    const Accordion: React.FunctionComponent<BookProps> = ({ title, content  }) => {
    const [isActive, setIsActive] = useState(false);
  
    return (
      <div className=' w-52'>
        <div className=" flex justify-between w-52 " onClick={() => setIsActive(!isActive)}>
          <div>{title}</div>
          <div>{isActive ? <ExpandLess /> : <ExpandMore />}</div>
        </div >
        {isActive && <div>{content}</div>}
      </div>
    );
    };
    const accordionData = [
        {
          title: 'Section Number 1',
          content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`
        },
        {
          title: 'Section Number 2',
          content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
          reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
          quaerat iure quos dolorum accusantium ducimus in illum vero commodi
          pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
          quidem maiores doloremque est numquam praesentium eos voluptatem amet!
          Repudiandae, mollitia id reprehenderit a ab odit!`
        },
        {
          title: 'Section Number 3',
          content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
          quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
          dolor ut sequi minus iste? Quas?`
        }
    ];  
    
    return (
        <div  className=" flex justify-center ">
            <div  > 
            <h1 className=' justify-center flex'>Accordion test</h1>
                {accordionData.map(({ title, content }, i) => (
                <Accordion  key={i} title={title} content={content} />
                ))}
            </div>
        </div>
  );
}; 