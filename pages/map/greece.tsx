import ControlContainer from '@/components/ControlContainer';
import MapSEO from '@/components/Seo/MapSEO';
import GreeceMap from '@/data/Greece/Greece.map';
import { GreeceStateCodes } from '@/data/Greece/GreeceStateCodes';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';

const Greece = () => (
    <MainLayout>
        <MapSEO name="Greece" type="Provinces" />
        <div className="flex justify-between container">
            <ControlContainer stateCodes={GreeceStateCodes} mapId="greece-map" />
            <GreeceMap />
        </div>
    </MainLayout>
);

export default Greece;
