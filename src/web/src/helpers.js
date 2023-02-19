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

export const getFormattedDate = (dateObject) => {
	try {
		const day =
			dateObject.day.toString().length === 2
				? dateObject.day.toString()
				: 0 + dateObject.day.toString();
		const month =
			dateObject.month.toString().length === 2
				? dateObject.month.toString()
				: 0 + dateObject.month.toString();
		const date = `${day}/${month}/${dateObject.year}`;
		return date;
	} catch (error) {
		return "12/34/5678";
	}
};

export const getFormattedBodyParams = (bodyParams) => {
	const getType = () => {
		switch (bodyParams.type) {
			case 1:
				return "Tipo: Retângulo";
			case 2:
				return "Tipo: Cilindro";
			case 3:
				return "Tipo: Tubo";
			default:
				return "";
		}
	};
	const getParamA = () => {
		switch (bodyParams.type) {
			case 1:
				return "Largura: " + bodyParams.param_a + "mm";
			case 2:
				return "Diam. Externo: " + bodyParams.param_a + "mm";
			case 3:
				return "Diam. Externo: " + bodyParams.param_a + "mm";
			default:
				return "";
		}
	};
	const getParamB = () => {
		switch (bodyParams.type) {
			case 1:
				return "Profundidade: " + bodyParams.param_b + "mm";
			case 2:
				return "";
			case 3:
				return "Diam. Interno: " + bodyParams.param_b + "mm";
			default:
				return "";
		}
	};
	const getHeight = () => {
		return "Altura: " + bodyParams.height + "mm";
	};

	return {
		type: getType(),
		paramA: getParamA(),
		paramB: getParamB(),
		height: getHeight(),
	};
};

export const getRandomColor = () =>
	"#" + Math.floor(Math.random() * 16777215).toString(16);
