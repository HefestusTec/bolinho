// Copyright (C) 2023 Hefestus
//
// This file is part of Bolinho.
//
// Bolinho is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Bolinho is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Bolinho.  If not, see <http://www.gnu.org/licenses/>.

export type ReadingsType = {
    z_axis_pos: number; // Position of the z-axis in mm
    current_load: number; // Load reading from the load cell in Newtons
    current_delta_load: number;
    status: string; // Arbitrary status string
};

export const defaultReadingsType: ReadingsType = {
    z_axis_pos: 0,
    current_load: 0,
    current_delta_load: 0,
    status: "",
};
