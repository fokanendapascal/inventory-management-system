import securedAxiosInstance from "./AxiosInstance";

export const createCmdService = (baseURL) => ({
    
    // ---- CRUD de base ----
    listAll: () => securedAxiosInstance.get(`${baseURL}/all`),

    create: (commande) =>
        securedAxiosInstance.post(`${baseURL}/create`, commande),

    findById: (idCommande) =>
        securedAxiosInstance.get(`${baseURL}/id/${idCommande}`),

    deleteCmd: (idCmd) =>
        securedAxiosInstance.delete(`${baseURL}/delete/${idCmd}`),

    findByCode: (code) =>
        securedAxiosInstance.get(`${baseURL}/code/${code}`),

    // ---- Mise à jour ----
    updateEtat: (idCmd, etatCmd) =>
        securedAxiosInstance.put(`${baseURL}/update/etat/${idCmd}/${etatCmd}`),

    updateQuantite: (idCmd, idLigneCmd, quantite) =>
        securedAxiosInstance.put(`${baseURL}/update/quantite/${idCmd}/${idLigneCmd}/${quantite}`),

    updateClient: (idCmd, idClient) =>
        securedAxiosInstance.put(`${baseURL}/update/client/${idCmd}/${idClient}`),

    updateFournisseur: (idCmd, idFournisseur) =>
        securedAxiosInstance.put(`${baseURL}/update/fournisseur/${idCmd}/${idFournisseur}`),

    updateArticle: (idCmd, idLigneCmd, idArticle) =>
        securedAxiosInstance.put(`${baseURL}/update/article/${idCmd}/${idLigneCmd}/${idArticle}`),

    deleteArticle: (idCmd, idLigneCmd) =>
        securedAxiosInstance.delete(`${baseURL}/delete/article/${idCmd}/${idLigneCmd}`),

    // ---- Lignes ----
    findLignes: (idCmd) =>
        securedAxiosInstance.get(`${baseURL}/lignescommande/${idCmd}`)
            .catch(() =>
                securedAxiosInstance.get(`${baseURL}/lignesCommande/${idCmd}`)
            ),

    // ---- Nouvelle méthode obligatoire : SYNC ----
    async sync(idCmd, oldCmd, newCmd) {

        // 1. Mettre à jour client / fournisseur
        if (newCmd.clientId && newCmd.clientId !== oldCmd.client?.id) {
            await this.updateClient(idCmd, newCmd.clientId);
        }

        if (newCmd.fournisseurId && newCmd.fournisseurId !== oldCmd.fournisseur?.id) {
            await this.updateFournisseur(idCmd, newCmd.fournisseurId);
        }

        // 2. Mettre à jour chaque ligne
        for (let i = 0; i < newCmd.lignes.length; i++) {
            const ln = newCmd.lignes[i];
            const old = oldCmd.lignesCommande?.[i];

            if (!old) continue;

            // quantite
            if (ln.quantite !== old.quantite) {
                await this.updateQuantite(idCmd, old.id, ln.quantite);
            }

            // article
            if (ln.articleId !== old.article?.id) {
                await this.updateArticle(idCmd, old.id, ln.articleId);
            }
        }

        return true;
    }

});
