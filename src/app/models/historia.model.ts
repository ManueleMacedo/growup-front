export interface UserStory {
    id: number;
    
    titulo: string;
    descricao: string;
    prioridade: string; 
    status: string;
    jiraIssueKey: string | null;

    papel: string;
    acao: string;
    beneficio: string;
    
    editando: boolean; 
    estimativa?: number;
}