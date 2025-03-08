<script setup>
import NavBar from '../components/NavBar.vue';
</script>

<template>
	<NavBar />
	
	<div class="container px-4 py-5">
		<h2 class="pb-2 border-bottom">Fonctionnalités</h2>
	
		<div class="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5 text-center text-md-start">
			<div class="col d-flex flex-column gap-2 align-items-start">
				<h2 class="fw-bold text-body-emphasis text-center">Le plaisir du partage des decks</h2>
				<p class="text-body-secondary">Besoin de conseils pour build un nouveau deck ? Ou encore tu veux des avis sur tes decks ? Créé et partage tes decks avec toute la communauté !</p>
			</div>
		
			<div class="col">
				<div class="row row-cols-1 row-cols-sm-2 g-4">
					<div class="col d-flex flex-column gap-2">
						<div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
							<a aria-disabled="true"><i class="fas fa-share"></i></a>
						</div>
						<h4 class="fw-semibold mb-0 text-body-emphasis">Partage de decks (à venir)</h4>
						<p class="text-body-secondary">Les deck partagés par la communauté seront visibles et pourront être copiés, et personnalisés.</p>
					</div>
		
					<div class="col d-flex flex-column gap-2">
						<div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
							<span class="icon"><i class="fas fa-inbox"></i></span>
						</div>
						<h4 class="fw-semibold mb-0 text-body-emphasis">Construction de deck</h4>
						<p class="text-body-secondary">Laisse parler tes envies, construit le deck de tes rêves !</p>
					</div>

					<div class="col d-flex flex-column gap-2">
						<div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
							<span class="icon"><i class="fas fa-search"></i></span>
						</div>
						<h4 class="fw-semibold mb-0 text-body-emphasis">Recherche de carte</h4>
						<p class="text-body-secondary">Toutes les cartes qui existent sont répertoriées. Tu pourras filtrer tranquillement grâce à tous les filtres à disposition</p>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>
