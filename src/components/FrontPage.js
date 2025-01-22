import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/FrontPage.css'; // For custom styles

// Constants
const TEXT_COLOR = 'rgba(0, 255, 0, 0.9)';
const BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.8)';
const ALPHA_BACKGROUND_COLOR = '#00000018';
const FONT = '15pt monospace';
const TEXT_COLUMN_WIDTH = 20;
const FPS = 20;

// Utility function
const getPseudoRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// MatrixBackground Component
function MatrixBackground({ destroyMode }) {
    const matrixCanvasRef = useRef(null);

    const initializeMatrixCanvas = useCallback(() => {
        if (!matrixCanvasRef.current) return;

        const canvas = matrixCanvasRef.current;
        const canvasContext = canvas.getContext('2d');
        if (!canvasContext) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        canvasContext.fillStyle = BACKGROUND_COLOR;
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        const numberOfColumns = Math.floor(canvas.width / TEXT_COLUMN_WIDTH) + 1;
        return Array(numberOfColumns).fill(0);
    }, []);

    const drawMatrix = useCallback((yPositions) => {
        if (!matrixCanvasRef.current) return;

        const canvas = matrixCanvasRef.current;
        const canvasContext = canvas.getContext('2d');
        if (!canvasContext) return;

        canvasContext.fillStyle = ALPHA_BACKGROUND_COLOR;
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        canvasContext.fillStyle = TEXT_COLOR;
        canvasContext.font = FONT;

        const newYPositions = yPositions.map((y, index) => {
            const char = String.fromCharCode(getPseudoRandomInRange(33, 126));
            const x = index * TEXT_COLUMN_WIDTH;
            canvasContext.fillText(char, x, y);

            return y > canvas.height ? 0 : y + 20;
        });

        return newYPositions;
    }, []);

    useEffect(() => {
        const yPositions = initializeMatrixCanvas();
        window.addEventListener('resize', initializeMatrixCanvas);

        const animate = (positions) => {
            const newPositions = drawMatrix(positions);
            if (newPositions) {
                setTimeout(() => animate(newPositions), 1000 / FPS);
            }
        };

        if (yPositions) animate(yPositions);

        return () => window.removeEventListener('resize', initializeMatrixCanvas);
    }, [initializeMatrixCanvas, drawMatrix]);

    useEffect(() => {
        document.body.style.overflow = destroyMode ? 'hidden' : '';
        document.body.style.position = destroyMode ? 'fixed' : '';
        document.body.style.top = destroyMode ? `-${window.scrollY}px` : '';
        document.body.style.width = destroyMode ? '100%' : '';
    }, [destroyMode]);

    return <canvas ref={matrixCanvasRef} className="matrix-background" aria-label="Matrix background" />;
}

// FrontPage Component
function FrontPage() {
    const [destroyMode, setDestroyMode] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, []);

    const handleHover = (event) => {
        if (destroyMode) event.target.style.display = 'none';
    };

    const handleDestroyClick = () => setDestroyMode(true);

    const handleEnterClick = () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        window.location.href = `${process.env.PUBLIC_URL}/#intro`;
    };

    return (
        <div className={`front-page ${destroyMode ? 'destroy-mode' : ''}`}>
            <MatrixBackground destroyMode={destroyMode} />
            <div className={`hero-section text-center ${destroyMode ? 'destroy-mode' : ''}`}>
                <h1 className="matrix-text" onMouseOver={handleHover}>
                    You take the blue pill—you keep scrolling, and everything stays the same. You take the red pill—and you see how deep the rabbit hole goes.<br />
                    <span>All I'm offering is the truth.</span>
                </h1>
                <div className="button-group">
                    <button onClick={handleEnterClick} disabled={destroyMode} className="btn btn-one">Enter</button>
                    <button onClick={handleDestroyClick} disabled={destroyMode} className="btn btn-two">Crash this Website</button>
                </div>
            </div>
        </div>
    );
}

export default FrontPage;
