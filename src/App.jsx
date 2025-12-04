import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BudgetProvider } from './context/BudgetContext';
import { Layout } from './components/layout/Layout';
import { Home } from './features/Home';
import { ConcreteDosage } from './features/calculators/ConcreteDosage/ConcreteDosage';
import { BrickWall } from './features/calculators/BrickWall/BrickWall';
import { Plaster } from './features/calculators/Plaster/Plaster';
import { Foundation } from './features/calculators/Foundation/Foundation';
import { OverFoundation } from './features/calculators/OverFoundation/OverFoundation';
import { Footing } from './features/calculators/Footing/Footing';
import { Columns } from './features/calculators/Columns/Columns';
import { WeightToVolume } from './features/calculators/WeightToVolume/WeightToVolume';
import { MixYield } from './features/calculators/MixYield/MixYield';
import { Transport } from './features/calculators/Transport/Transport';
import { BudgetView } from './features/budget/BudgetView';

import { ThemeProvider } from './context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <BudgetProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="calculators/concrete-1m3" element={<ConcreteDosage />} />
                            <Route path="calculators/brick-wall" element={<BrickWall />} />
                            <Route path="calculators/plaster" element={<Plaster />} />
                            <Route path="calculators/foundation" element={<Foundation />} />
                            <Route path="calculators/over-foundation" element={<OverFoundation />} />
                            <Route path="calculators/footing" element={<Footing />} />
                            <Route path="calculators/columns" element={<Columns />} />
                            <Route path="calculators/weight-volume" element={<WeightToVolume />} />
                            <Route path="calculators/mix-yield" element={<MixYield />} />
                            <Route path="calculators/transport" element={<Transport />} />
                            <Route path="budget" element={<BudgetView />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </BudgetProvider>
        </ThemeProvider>
    );
}

export default App;
