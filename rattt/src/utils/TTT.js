export default class TTT{

	constructor(linhas, colunas, tabuleiro, seq, atual, total, bot){
		this.props = {linhas, colunas, tabuleiro, seq, atual, total, bot}
	}

	validate() {
		let sequencia;
	
		for(let i = 0; i < this.props.linhas; i++) {
			sequencia = 1;
			for(let j = 1; j < this.props.colunas; j++) {
				if(this.props.tabuleiro[i][j] >= 0 && this.props.tabuleiro[i][j] === this.props.tabuleiro[i][j - 1])
					sequencia++;
				else sequencia = 1;
				if(sequencia === this.props.seq)
					return this.props.tabuleiro[i][j];
			}
		}
	
		for(let j = 0; j < this.props.colunas; j++) {
			sequencia = 1;
			for(let i = 1; i < this.props.linhas; i++) {
				if(this.props.tabuleiro[i][j] >= 0 && this.props.tabuleiro[i][j] === this.props.tabuleiro[i - 1][j])
					sequencia++;
				else sequencia = 1;
				if(sequencia === this.props.seq)
					return this.props.tabuleiro[i][j];
			}
		}
	
		for(let i = 0; i < this.props.linhas - 1; i++) {
			for(let j = 0; j < this.props.colunas - 1; j++) {
				sequencia = 1;
				for(let k = 1; i + k < this.props.linhas && j + k < this.props.colunas; k++) {
					if(this.props.tabuleiro[i + k][j + k] >= 0
					   && this.props.tabuleiro[i + k][j + k] === this.props.tabuleiro[i + k - 1][j + k - 1])
						sequencia++;
					else sequencia = 1;
					if(sequencia === this.props.seq)
						return this.props.tabuleiro[i + k][j + k];
				}
			}
		}
	
		for(let i = 0; i < this.props.linhas - 1; i++) {
			for(let j = 1; j < this.props.colunas; j++) {
				sequencia = 1;
				for(let k = 1; i + k < this.props.linhas && j - k >= 0; k++) {
					if(this.props.tabuleiro[i + k][j - k] >= 0
					   && this.props.tabuleiro[i + k][j - k] === this.props.tabuleiro[i + k - 1][j - k + 1])
						sequencia++;
					else sequencia = 1;
					if(sequencia === this.props.seq)
						return this.props.tabuleiro[i + k][j - k];
				}
			}
		}
	
		return this.props.atual === this.props.total ? -2 : -1;
	};

	casoAleatorio() {
		let v = [];
		for(let i = 0; i < this.props.linhas; i++) {
			for(let j = 0; j < this.props.colunas; j++)
				if(this.props.tabuleiro[i][j] === undefined) v.push([i, j]);
		}
		return v[Math.floor(Math.random() * v.length)];
	}

	analisaSequenciaVitoria(casas, jogador) {
		let casaDisponivel = false;
		for(let c = 0; c < casas.length; c++) {
			let i = casas[c][0], j = casas[c][1];
			if(this.props.tabuleiro[i][j] === undefined && casaDisponivel == false)
				casaDisponivel = [i, j];
			else if(this.props.tabuleiro[i][j] != jogador)
				return false;
		}
		return casaDisponivel;
	}

	tradicional_canto() {
		let v = [];
		for(let i = 0; i < 4; i++)
			if(this.props.tabuleiro[(i > 1) * 2][(i % 2) * 2] === undefined)
				v.push([(i > 1) * 2, (i % 2) * 2]);
		return v.length ? v[Math.floor(Math.random() * v.length)] : false;
	}

	tradicional_medio() {
		let v = [];
		if(this.props.tabuleiro[0][1] === undefined) v.push([0, 1]);
		if(this.props.tabuleiro[1][0] === undefined) v.push([1, 0]);
		if(this.props.tabuleiro[1][2] === undefined) v.push([1, 2]);
		if(this.props.tabuleiro[2][1] === undefined) v.push([2, 1]);
		return v.length ? v[Math.floor(Math.random() * v.length)] : false;
	}

	tradicional_primeiraJogada() {
		if(this.props.atual > 1) return false;
		return this.props.tabuleiro[1][1] === undefined ? [1, 1] : this.tradicional_canto();
	}

	tradicional_casoDireto(caso) {
		let jogador, analise;
		if(caso == 'vitoria') jogador = this.props.bot;
		else jogador = (this.props.bot === 1) ? 0 : 1;

		for(let i = 0; i < 3; i++) {
			analise = this.analisaSequenciaVitoria([ [i, 0], [i, 1], [i, 2] ], jogador);
			if(analise) return analise;

			analise = this.analisaSequenciaVitoria(	[ [0, i], [1, i], [2, i] ], jogador);
			if(analise) return analise;

			if(i) {
				analise = this.analisaSequenciaVitoria(
					[ [0, i === 1 ? 0 : 2], [1, 1], [2, i == 1 ? 2 : 0] ], jogador
				);
				if(analise) return analise;
			}
		}
		return false;
	}

	tradicional_defensivaDiagonais() {
		let adversario = (this.props.bot == 1) ? 0 : 1;
		if((this.props.tabuleiro[0][0] === adversario && this.props.tabuleiro[2][2] === adversario) ||
		   (this.props.tabuleiro[0][2] === adversario && this.props.tabuleiro[2][0] === adversario))
			return this.tradicional_medio();
		return false;
	}

	tradicional_defensivaMedios() {
		let adversario = (this.props.bot === 1) ? 0 : 1;
		for(let i = 0; i < 4; i++) {
			if(this.props.tabuleiro[(i > 1) * 2][1] === adversario
			   && this.props.tabuleiro[1][(i % 2) * 2] === adversario
			   && this.props.tabuleiro[(i > 1) * 2][(i % 2) * 2] === undefined)
				return [(i > 1) * 2, (i % 2) * 2];
		}
		return false;
	}

	tradicional_defensivaCantoMedio() {
		let adversario = (this.props.bot === 1) ? 0 : 1;
		for(let i = 0; i < 4; i++) {
			if(this.props.tabuleiro[(i > 1) * 2][(i % 2) * 2] === adversario
			   && (this.props.tabuleiro[1][!(i % 2) * 2] === adversario
			   || this.props.tabuleiro[(i < 2) * 2][1] === adversario)
			   && this.props.tabuleiro[(i < 2) * 2][!(i % 2) * 2] === undefined)
				return [(i < 2) * 2, !(i % 2) * 2];
		}
		return false;
	}

	preencheCasa(pos, handle) {
		try{
			let i = pos[0], j = pos[1];
		handle(i, j);
		}catch(err){
			
		}
		
	}

	jogadaComputador(tipoBot, handle) {
		let that = this;
		this.timeout = setTimeout(function() {
			let casa;
			switch(tipoBot) {
				case 'bot-aleatorio':
					that.preencheCasa(that.casoAleatorio(), handle);
					break;
				case 'bot-tradicional-medio':
					if(casa = that.tradicional_primeiraJogada())
						that.preencheCasa(casa, handle);
					else if(casa = that.tradicional_casoDireto('vitoria'))
						that.preencheCasa(casa, handle);
					else if(casa = that.tradicional_casoDireto('derrota'))
						that.preencheCasa(casa, handle);
					else
						that.preencheCasa(that.casoAleatorio(), handle);
					break;
				case 'bot-tradicional-impossivel':
					if(casa = that.tradicional_primeiraJogada())
						that.preencheCasa(casa, handle);
					else if(casa = that.tradicional_casoDireto('vitoria'))
						that.preencheCasa(casa, handle);
					else if(casa = that.tradicional_casoDireto('derrota'))
						that.preencheCasa(casa, handle);
					else if(casa = that.tradicional_defensivaDiagonais())
						that.preencheCasa(casa, handle);
					else if(casa = that.tradicional_defensivaMedios())
						that.preencheCasa(casa, handle);
					else if(casa = that.tradicional_defensivaCantoMedio())
						that.preencheCasa(casa, handle);
					else
						that.preencheCasa(that.casoAleatorio(), handle);
					break;
			}
		}, 500);
	}

};