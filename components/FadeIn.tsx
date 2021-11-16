import React, { useEffect, useState } from 'react';

export enum FadeState {NONE, ANIMATE, HIDE}

export interface FadeInProps {
    animate?: FadeState;
    delay?: number;
    transitionDuration?: number;
    onComplete?: () => void;
}

export interface AnimateProps {
    animate: FadeState;
    onComplete: () => void;
}

const FadeIn: React.FC<FadeInProps> = (props) => {
    const [numAnimated, setNumAnimated] = useState(0);

    const animate = props.animate === undefined ? FadeState.ANIMATE : props.animate;
    const delay = props.delay || 50;
    const transitionDuration = props.transitionDuration || 400;

    useEffect(() => {
        if (numAnimated === React.Children.count(props.children)) {
            const timeout = setTimeout(() => {
                if (props.onComplete) props.onComplete();
            }, transitionDuration);
            return () => clearTimeout(timeout);
        }

        if (animate === FadeState.ANIMATE) {
            const timeout = setTimeout(() => setNumAnimated(numAnimated + 1), delay);
            return () => clearTimeout(timeout);
        }
    });

    if (animate === FadeState.HIDE)
        return <div style={{visibility: 'hidden'}}>{props.children}</div>;

    const children = React.Children.map(props.children, (child, i) => {
        const style = {
            transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
            transform: numAnimated > i ? "none" : "translateY(20px)",
            opacity: numAnimated > i ? 1 : 0,
        }

        return animate === FadeState.ANIMATE ? (
            <div style={style}>{child}</div>
        ) : (
            <>{child}</>
        )
    });

    return <>{children}</>;
}

export default FadeIn;