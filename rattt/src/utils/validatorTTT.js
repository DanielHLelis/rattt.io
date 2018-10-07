export default analisaVencedor;

function analisaVencedor(linhas, colunas, tabuleiro, seq, atual, total) {
	let sequencia;

	for(let i = 0; i < linhas; i++) {
		sequencia = 1;
		for(let j = 1; j < colunas; j++) {
			if(tabuleiro[i][j] > 0 && tabuleiro[i][j] == tabuleiro[i][j - 1])
				sequencia++;
			else sequencia = 1;
			if(sequencia == seq)
				return tabuleiro[i][j];
		}
	}

	for(let j = 0; j < colunas; j++) {
		sequencia = 1;
		for(let i = 1; i < this.linhas; i++) {
			if(tabuleiro[i][j] > 0 && tabuleiro[i][j] == tabuleiro[i - 1][j])
				sequencia++;
			else sequencia = 1;
			if(sequencia == seq)
				return tabuleiro[i][j];
		}
	}

	for(let i = 0; i < linhas - 1; i++) {
		for(let j = 0; j < colunas - 1; j++) {
			sequencia = 1;
			for(let k = 1; i + k < linhas && j + k < colunas; k++) {
				if(tabuleiro[i + k][j + k] > 0
				   && tabuleiro[i + k][j + k] == tabuleiro[i + k - 1][j + k - 1])
					sequencia++;
				else sequencia = 1;
				if(sequencia == seq)
					return tabuleiro[i + k][j + k];
			}
		}
	}

	for(let i = 0; i < linhas - 1; i++) {
		for(let j = 1; j < colunas; j++) {
			sequencia = 1;
			for(let k = 1; i + k < linhas && j - k >= 0; k++) {
				if(tabuleiro[i + k][j - k] > 0
				   && tabuleiro[i + k][j - k] == tabuleiro[i + k - 1][j - k + 1])
					sequencia++;
				else sequencia = 1;
				if(sequencia == seq)
					return tabuleiro[i + k][j - k];
			}
		}
	}

	return atual == total ? 0 : -1;
};