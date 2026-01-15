'use client';
import { Search, Plus, ChevronDown } from "lucide-react";
import MainNav from "./main-nav"; // Importa o arquivo que você preencheu acima
import React from 'react';

export function SidebarContainer() {
  return (
    <aside className="w-64 h-screen bg-[#0f0f0f] text-zinc-400 flex flex-col border-r border-zinc-800">
      {/* Header com Busca */}
      <div className="p-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-md border border-zinc-800">
          <Search size={14} />
          <input placeholder="Buscar..." className="bg-transparent text-xs outline-none w-full" />
        </div>
      </div>

      {/* Miolo de Navegação */}
      <div className="flex-1 overflow-y-auto">
        <MainNav /> 
        
        {/* Seção de Espaços (Igual a sua referência) */}
        <div className="mt-6 px-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            <span>Espaços</span>
            <Plus size={14} className="cursor-pointer hover:text-white" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm py-1 px-2 hover:bg-zinc-800 rounded-md cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Desenvolvimento
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}