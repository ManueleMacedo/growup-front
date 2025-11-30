import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserStory } from '../../models/historia.model';
import { UserStoryService } from '../../services/user-story.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

type StatusUpload = 'PARADO' | 'CARREGANDO' | 'SUCESSO' | 'ERRO';

@Component({
  selector: 'app-upload-inicial',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], 
  templateUrl: './upload-inicial.component.html',
  styleUrls: ['./upload-inicial.component.css']
})
export class UploadInicialComponent implements OnInit {
    
    nomeDoProjeto: string = ''; 
    contextoAdicional: string = ''; 
    arquivoSelecionado: File | null = null; 
    status: StatusUpload = 'PARADO'; 
    
    prompt: string = ''; 

    constructor(
        private userStoryService: UserStoryService,
        private router: Router
    ) { }

    ngOnInit(): void {
        
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.arquivoSelecionado = file;
        } else {
            this.arquivoSelecionado = null;
        }
    }

    gerarEAvancar(): void {
        if (!this.arquivoSelecionado || this.status === 'CARREGANDO') {
            alert('Por favor, selecione um arquivo para continuar.');
            return;
        }

        this.status = 'CARREGANDO';

        this.prompt = `Projeto: ${this.nomeDoProjeto}. Contexto: ${this.contextoAdicional}.`;

        const formData = new FormData();
        formData.append('prompt', this.prompt); 
        formData.append('file', this.arquivoSelecionado, this.arquivoSelecionado.name); 

        this.userStoryService.gerarEProcessarHistorias(formData).subscribe({
            next: (historias) => {
                this.status = 'SUCESSO';
                this.router.navigate(['/backlog']);
            },
            error: (err) => {
                this.status = 'ERRO';
                console.error('Erro ao processar upload:', err);
                alert('Falha ao processar e salvar histórias. Verifique o console.');
            }
        });
    }
}