import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";

export enum Positions {
    Bottom = 'bottom',
    Left = 'left-bottom',
    LeftTop = 'left-top',
    Top = 'top',
    RightTop = 'right-top',
    Right = 'right-bottom',
}

type PopoverProps = {
    children: React.ReactElement<HTMLElement>[],
    style?: React.CSSProperties,
    className?: string;
    position?: Positions;
    bounds?: DOMRect;
};

const Popover = forwardRef((props: PopoverProps, ref: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const positionsArray = Object.values(Positions);
    const buttonRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<any>();
    const position = props.position || Positions.Bottom;
    const container = props.children.find((child => child.props.role === 'container'));
    const button = props.children.find((child => child.props.role === 'btn'));
    const rect = props.bounds || buttonRef.current?.getBoundingClientRect?.();
    const triggerOpen = (open: boolean) => {
        setOpen(open);
    }

    useImperativeHandle(ref, () => ({
        triggerOpen
    }));
    let left = 0;
    let top = 0;

    const isAvailable = (num: number) => {
        if (!rect) return false;

        switch (positionsArray[num]) {
            case Positions.Bottom:
                if (rect.bottom > rect.top && rect.left >= 0) return positionsArray[num];
                break;
            case Positions.Top:
                if (rect.top > rect.bottom && rect.left >= 0) return positionsArray[num];
                break;
            case Positions.Left:
                if (rect.left > rect.right && rect.bottom > rect.top) return positionsArray[num];
                break;
            case Positions.Right:
                if (rect.right > rect.left && rect.bottom > rect.top) return positionsArray[num];
                break;
            case Positions.LeftTop:
                if (rect.left > rect.right && rect.top > rect.bottom) return positionsArray[num];
                break;
            case Positions.RightTop:
                if (rect.right > rect.left && rect.top > rect.bottom) return positionsArray[num];
                break;

            default:
                return false;
        }
    };
    const findClosestAvailablePossition = (num: number, step: number = 0): any => {
        const getNext = (next: number) => (next) % positionsArray.length;
        const getPrev = (prev: number) => (prev) < 0 ? positionsArray.length + (prev) : (prev);

        const left = isAvailable(getNext(num + step));
        const right = step !== 0 && isAvailable(getPrev(num - step));
        if (!left && !right) {
            return findClosestAvailablePossition(num, step + 1);
        } else {
            return left || right;
        }
    }

    if (popoverRef.current && rect) {
        const pos = findClosestAvailablePossition(positionsArray.indexOf(position));
        if (pos === Positions.Bottom) {
            top = rect.bottom;
            left = (rect.width - popoverRef.current.getBoundingClientRect().width) / 2 + rect.left;
        }
        if (pos === Positions.Top) {
            top = rect.bottom - rect.height - rect.width - rect.x;
            left = (rect.width - popoverRef.current.getBoundingClientRect().width) / 2 + rect.left;
        }
        if (pos === Positions.Left) {
            top = rect.bottom - rect.height;
            left = rect.left - rect.width;
        }
        if (pos === Positions.LeftTop) {
            top = rect.bottom - rect.width - rect.x;
            left = rect.left - rect.width;
        }
        if (pos === Positions.Right) {
            top = rect.bottom - rect.height;
            left = rect.left + rect.width;
        }
        if (pos === Positions.RightTop) {
            top = rect.bottom - rect.width - rect.x;
            left = rect.left + rect.width;
        }
    }

    return (
        <div ref={ref}>
            <div ref={buttonRef} onClick={() => triggerOpen(!open)}>{button}</div>
            {createPortal(<div
                ref={popoverRef}
                style={{
                    top,
                    left,
                    visibility: open ? "visible" : "hidden",
                    ...props.style
                }}
                className={`${props?.className || ''} absolute`}
            >
                {container}
            </div>, document.body)}
        </div>
    )
})

export default Popover;