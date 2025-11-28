
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle, AlertCircle, ChevronRight, Search, FileText, Download, ShieldCheck, Info, ArrowLeft, Bot, ExternalLink, BookOpen, Bell, Calendar, Trash2, Clock, Plus, X, Moon, Sun, Star, Briefcase, MessageSquare, Send, User as UserIcon, Scale, FileSearch, HelpCircle, ShieldAlert } from 'lucide-react';
import { MobileShell, BottomNav, Header, Card, Button, Input, Logo } from './components/Layout';
import { MockApiService } from './services/api';
import { User, Process, Dispatch, DispatchStatus, UserType, Deadline, Article, Specialist, Chat, Message } from './types';
import { MOCK_INPI_DB, EDUCATION_ARTICLES, MOCK_SPECIALISTS, INITIAL_CHAT_MESSAGE } from './constants';

// --- Screens Components ---

// 1. Splash Screen
const SplashScreen = () => (
  <div className="flex flex-col items-center justify-center h-full bg-brand-600 text-white p-8 relative overflow-hidden dark:bg-slate-900">
    {/* Background Pattern */}
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
       <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
       <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
    </div>

    <div className="relative z-10 flex flex-col items-center">
      <div className="mb-6 shadow-2xl rounded-3xl">
        <Logo size={100} variant="white" />
      </div>
      <h1 className="text-4xl font-bold mb-2 tracking-tight">Marca em Dia</h1>
      <p className="text-brand-100 text-center text-lg max-w-xs leading-relaxed">Proteção inteligente para o seu patrimônio.</p>
    </div>
    
    <div className="mt-16 animate-pulse flex gap-2">
      <div className="w-2 h-2 bg-white rounded-full"></div>
      <div className="w-2 h-2 bg-white rounded-full animation-delay-200"></div>
      <div className="w-2 h-2 bg-white rounded-full animation-delay-400"></div>
    </div>
  </div>
);

// 2. Auth Screens
const AuthScreen = ({ onLogin }: { onLogin: (user: User) => void }) => {
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [formData, setFormData] = useState({ name: '', email: '', doc: '', type: UserType.PF });
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!formData.name || !formData.email || !formData.doc) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    setLoading(true);
    setError('');
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('verify');
    }, 1000);
  };

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    const isValid = await MockApiService.verifyEmailCode(code);
    setLoading(false);

    if (isValid) {
      const newUser: User = {
        id: 'u1',
        name: formData.name,
        email: formData.email,
        type: formData.type,
        document: formData.doc,
        isVerified: true
      };
      // Save to local storage
      localStorage.setItem('mm_user', JSON.stringify(newUser));
      localStorage.setItem('mm_token', 'mock_jwt_token');
      onLogin(newUser);
    } else {
      setError('Código inválido. Tente 123456.');
    }
  };

  if (step === 'verify') {
    return (
      <div className="p-8 flex flex-col h-full">
        <div className="flex-1 mt-10">
          <div className="flex justify-center mb-6">
            <div className="bg-brand-50 p-4 rounded-full dark:bg-slate-800">
              <Logo size={48} variant="brand" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center text-slate-800 dark:text-white">Verifique seu e-mail</h2>
          <p className="text-gray-500 mb-8 text-center dark:text-slate-400">Enviamos um código de 6 dígitos para <br/><span className="font-bold text-slate-700 dark:text-slate-200">{formData.email}</span></p>
          <Input
            label="Código de Validação"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            className="text-center text-2xl tracking-widest"
            error={error}
          />
          <div className="mt-4 text-center">
             <button className="text-sm text-brand-600 font-medium hover:text-brand-500 dark:text-brand-400">Reenviar código</button>
          </div>
        </div>
        <Button onClick={handleVerify} loading={loading} fullWidth>Validar</Button>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col h-full overflow-y-auto no-scrollbar">
      <div className="mb-8 mt-4">
        <Logo size={60} variant="brand" className="mb-6" />
        <h2 className="text-3xl font-bold text-slate-900 mb-2 dark:text-white">Crie sua conta</h2>
        <p className="text-gray-500 text-lg dark:text-slate-400">Comece a monitorar suas marcas e prazos hoje.</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex gap-4 mb-2">
          <button
            onClick={() => setFormData({ ...formData, type: UserType.PF })}
            className={`flex-1 py-3 text-sm font-medium rounded-xl border transition-colors ${formData.type === UserType.PF ? 'bg-brand-50 border-brand-500 text-brand-700 dark:bg-brand-900/20 dark:border-brand-500 dark:text-brand-400' : 'border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800'}`}
          >
            Pessoa Física
          </button>
          <button
             onClick={() => setFormData({ ...formData, type: UserType.PJ })}
             className={`flex-1 py-3 text-sm font-medium rounded-xl border transition-colors ${formData.type === UserType.PJ ? 'bg-brand-50 border-brand-500 text-brand-700 dark:bg-brand-900/20 dark:border-brand-500 dark:text-brand-400' : 'border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800'}`}
          >
            Pessoa Jurídica
          </button>
        </div>

        <Input
          label="Nome Completo / Razão Social"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          label={formData.type === UserType.PF ? 'CPF' : 'CNPJ'}
          value={formData.doc}
          onChange={(e) => setFormData({ ...formData, doc: e.target.value })}
        />
        <Input
          label="E-mail"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <div className="mt-auto">
        <p className="text-xs text-gray-400 mb-4 text-center dark:text-slate-500">Ao continuar, você aceita nossos Termos de Uso.</p>
        <Button onClick={handleRegister} loading={loading} fullWidth>Criar Conta</Button>
      </div>
    </div>
  );
};

// 3. Dashboard
const Dashboard = ({ processes, onChangeTab, onSelect }: { processes: Process[], onChangeTab: (t: string) => void, onSelect: (p: Process) => void }) => {
  const activeCount = processes.length;
  // Calculate attention based on dispatches OR pending deadlines
  const attentionCount = processes.filter(p =>
    p.dispatches.some(d => d.status === DispatchStatus.PENDING_ACTION) ||
    p.deadlines.some(d => !d.isCompleted && new Date(d.date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) // Due in 7 days
  ).length;

  const data = [
    { name: 'Em dia', value: activeCount - attentionCount, color: '#10b981' }, // Emerald 500
    { name: 'Atenção', value: attentionCount, color: '#ef4444' }, // Red 500
  ];

  if (activeCount === 0) {
      data[0].value = 1; // Dummy for empty state
      data[0].color = '#e5e7eb'; // Gray 200
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="bg-brand-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden dark:bg-brand-950">
        <div className="relative z-10">
          <p className="text-brand-200 text-sm font-medium mb-1">Resumo Geral</p>
          <h2 className="text-3xl font-bold mb-4">{activeCount} Processos</h2>
          {attentionCount > 0 ? (
            <div className="flex items-center gap-2 text-red-200 bg-red-900/30 py-1 px-3 rounded-full w-fit border border-red-500/20">
              <AlertCircle size={16} />
              <span className="text-sm font-medium">{attentionCount} requerem atenção</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-200 bg-emerald-900/30 py-1 px-3 rounded-full w-fit border border-emerald-500/20">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">Tudo certo por aqui</span>
            </div>
          )}
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} innerRadius={35} outerRadius={50} dataKey="value" stroke="none">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Specialist Banner */}
      <div 
        onClick={() => onChangeTab('specialists')}
        className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-4 text-white shadow-lg cursor-pointer transform hover:scale-[1.02] transition-transform relative overflow-hidden"
      >
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
              <Star size={18} className="text-yellow-200 fill-yellow-200" />
              Ajuda Especializada
            </h3>
            <p className="text-amber-100 text-xs max-w-[200px]">Precisa de um advogado? Encontre especialistas verificados para o seu caso.</p>
          </div>
          <div className="bg-white/20 p-2 rounded-full">
            <ChevronRight size={24} />
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white opacity-10 rounded-full"></div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-slate-800 dark:text-white">Ações Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card className="flex flex-col items-center justify-center p-6 gap-3 hover:border-brand-200 dark:hover:border-brand-700 transition-colors" onClick={() => onChangeTab('add')}>
            <div className="p-3 bg-brand-50 text-brand-600 rounded-full dark:bg-brand-900/30 dark:text-brand-400">
              <Search size={24} />
            </div>
            <span className="text-sm font-semibold text-center dark:text-slate-200">Buscar Processo</span>
          </Card>
           <Card className="flex flex-col items-center justify-center p-6 gap-3 hover:border-brand-200 dark:hover:border-brand-700 transition-colors" onClick={() => onChangeTab('education')}>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full dark:bg-purple-900/30 dark:text-purple-400">
              <BookOpen size={24} />
            </div>
            <span className="text-sm font-semibold text-center dark:text-slate-200">Como Depositar</span>
          </Card>
          
          {/* Aquiles Blockchain System Link */}
          <Card 
            className="col-span-2 flex flex-row items-center justify-between p-4 border-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none transform active:scale-95 transition-all" 
            onClick={() => window.open('https://www.authoradigital.com.br/', '_blank')}
          >
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 text-white rounded-full backdrop-blur-sm shadow-inner">
                   <ShieldCheck size={24} />
                </div>
                <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white tracking-wide">Authora - Blockchain</span>
                    <span className="text-xs text-emerald-50 font-medium">Registre obras, ideias, músicas, etc...</span>
                </div>
            </div>
            <ExternalLink size={18} className="text-emerald-100" />
          </Card>
        </div>
      </div>

      {attentionCount > 0 && (
         <div>
            <h3 className="text-lg font-bold mb-3 text-slate-800 dark:text-white">Pendências</h3>
            {processes.filter(p => 
              p.dispatches.some(d => d.status === DispatchStatus.PENDING_ACTION) ||
              p.deadlines.some(d => !d.isCompleted && new Date(d.date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
            ).map(p => (
                <div key={p.id} onClick={() => onSelect(p)} className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-4 mb-2 cursor-pointer dark:bg-red-900/10 dark:border-red-900/30">
                    <div className="p-2 bg-red-100 rounded-full text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-slate-800 dark:text-white">{p.brandName}</p>
                        <p className="text-xs text-red-600 dark:text-red-400 font-medium">Prazo ou despacho crítico</p>
                    </div>
                    <ChevronRight className="ml-auto text-red-300 dark:text-red-800" size={20} />
                </div>
            ))}
         </div>
      )}
    </div>
  );
};

// 4. Process List
const ProcessList = ({ processes, onSelect }: { processes: Process[], onSelect: (p: Process) => void }) => {
  return (
    <div className="p-4 space-y-3 pb-24">
      {processes.length === 0 ? (
        <div className="text-center py-20">
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-slate-800">
             <FileText size={40} className="text-gray-400 dark:text-slate-600" />
          </div>
          <h3 className="text-gray-600 font-medium dark:text-slate-400">Nenhum processo cadastrado</h3>
          <p className="text-gray-400 text-sm mt-1 dark:text-slate-500">Adicione seu processo do INPI para começar.</p>
        </div>
      ) : (
        processes.map(p => (
          <Card key={p.id} onClick={() => onSelect(p)} className="relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded dark:bg-slate-700 dark:text-slate-300">{p.inpiNumber}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 dark:text-white">{p.brandName}</h3>
              </div>
              <div className={`w-3 h-3 rounded-full ${p.dispatches.some(d => d.status === DispatchStatus.PENDING_ACTION) ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
            </div>
            <div className="flex justify-between items-end mt-4">
               <div>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Classe {p.niceClass}</p>
                  <p className="text-xs font-medium text-slate-700 mt-1 dark:text-slate-300">{p.status}</p>
               </div>
               <div className="flex items-center gap-2">
                 {p.deadlines.filter(d => !d.isCompleted).length > 0 && (
                   <div className="flex items-center gap-1 bg-brand-50 text-brand-700 text-[10px] px-2 py-1 rounded-full font-bold dark:bg-brand-900/30 dark:text-brand-300">
                     <Clock size={10} />
                     {p.deadlines.filter(d => !d.isCompleted).length} prazos
                   </div>
                 )}
                 <ChevronRight className="text-gray-300 dark:text-slate-600" size={20} />
               </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

// 5. Process Detail & AI Logic & Deadlines
const ProcessDetail = ({ process, onBack, onUpdateProcess, onDelete, onHireSpecialist }: { process: Process, onBack: () => void, onUpdateProcess: (p: Process) => void, onDelete: (id: string) => void, onHireSpecialist: () => void }) => {
  const [selectedDispatch, setSelectedDispatch] = useState<Dispatch | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [thinking, setThinking] = useState(false);
  
  // Deadline State
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [newDeadlineData, setNewDeadlineData] = useState({ title: '', date: '', dispatchId: '' });
  const [deadlineToDelete, setDeadlineToDelete] = useState<string | null>(null);

  // Delete State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleAiExplain = async (dispatch: Dispatch) => {
    setSelectedDispatch(dispatch);
    setThinking(true);
    setAiExplanation('');
    
    const explanation = await MockApiService.explainDispatchWithAI(dispatch);
    setAiExplanation(explanation);
    setThinking(false);
  };

  const handleOpenAddDeadline = (dispatch?: Dispatch) => {
    const today = new Date();
    // Default to 60 days if associated with a dispatch (common term), else tomorrow
    const defaultDate = new Date(today.setDate(today.getDate() + (dispatch ? 60 : 1))).toISOString().split('T')[0];

    setNewDeadlineData({
      title: dispatch ? `Prazo: ${dispatch.code}` : '',
      date: defaultDate,
      dispatchId: dispatch ? dispatch.code : ''
    });
    setShowDeadlineModal(true);
  };

  const handleSaveDeadline = () => {
    if (!newDeadlineData.title || !newDeadlineData.date) return;

    const newDeadline: Deadline = {
      id: Date.now().toString(),
      title: newDeadlineData.title,
      date: newDeadlineData.date,
      dispatchId: newDeadlineData.dispatchId || undefined,
      isCompleted: false
    };

    // Simulate Notification Schedule
    MockApiService.scheduleNotification(newDeadline.title, newDeadline.date);

    // Update Process
    const updatedProcess = {
      ...process,
      deadlines: [...process.deadlines, newDeadline]
    };

    onUpdateProcess(updatedProcess);
    setShowDeadlineModal(false);
  };

  const toggleDeadline = (id: string) => {
    const updatedDeadlines = process.deadlines.map(d => 
      d.id === id ? { ...d, isCompleted: !d.isCompleted } : d
    );
    onUpdateProcess({ ...process, deadlines: updatedDeadlines });
  };

  const confirmDeleteDeadline = () => {
     if (deadlineToDelete) {
        const updatedDeadlines = process.deadlines.filter(d => d.id !== deadlineToDelete);
        onUpdateProcess({ ...process, deadlines: updatedDeadlines });
        setDeadlineToDelete(null);
     }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 dark:bg-slate-950 transition-colors">
       <div className="bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-2 sticky top-0 z-30 dark:bg-slate-900 dark:border-slate-800">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full dark:hover:bg-slate-800">
            <ArrowLeft size={24} className="text-slate-700 dark:text-white" />
          </button>
          <span className="font-bold text-slate-800 truncate dark:text-white">{process.brandName}</span>
       </div>

       <div className="p-4 space-y-4 overflow-y-auto no-scrollbar">
          {/* Header Info */}
          <Card className="bg-brand-50 border-brand-100 dark:bg-slate-800 dark:border-slate-700">
             <div className="grid grid-cols-2 gap-4 text-sm dark:text-slate-200">
                <div>
                  <p className="text-gray-500 text-xs dark:text-slate-400">Processo</p>
                  <p className="font-mono font-medium">{process.inpiNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs dark:text-slate-400">Classe</p>
                  <p className="font-medium">NCL {process.niceClass}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs dark:text-slate-400">Titular</p>
                  <p className="font-medium truncate">{process.owner}</p>
                </div>
             </div>
          </Card>

           {/* Deadlines Section */}
           <div>
            <div className="flex justify-between items-center mb-3 mt-2">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 dark:text-white">
                  <Calendar size={20} className="text-brand-600 dark:text-brand-400"/>
                  Agenda & Prazos
                </h3>
                <button onClick={() => handleOpenAddDeadline()} className="text-brand-600 text-sm font-bold flex items-center gap-1 bg-brand-50 px-3 py-1 rounded-full dark:bg-brand-900/30 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/50">
                  <Plus size={14} /> Novo
                </button>
            </div>
            
            {process.deadlines.length === 0 ? (
               <div className="text-center py-6 bg-white rounded-xl border border-gray-100 border-dashed dark:bg-slate-900 dark:border-slate-800">
                  <p className="text-gray-400 text-sm dark:text-slate-500">Nenhum prazo definido.</p>
               </div>
            ) : (
              <div className="space-y-2">
                {process.deadlines.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(d => (
                  <div key={d.id} className={`bg-white p-3 rounded-lg border flex items-center gap-3 transition-opacity dark:bg-slate-800 ${d.isCompleted ? 'opacity-50 border-gray-100 dark:border-slate-800' : 'border-gray-200 dark:border-slate-700'}`}>
                     <button title={d.isCompleted ? "Reabrir prazo" : "Concluir prazo"} onClick={() => toggleDeadline(d.id)} className={`flex-shrink-0 ${d.isCompleted ? 'text-emerald-500' : 'text-gray-300 hover:text-brand-500 dark:text-slate-500 dark:hover:text-brand-400'}`}>
                        {d.isCompleted ? <CheckCircle size={22} fill="#ecfdf5"/> : <div className="w-[22px] h-[22px] rounded-full border-2 border-current" />}
                     </button>
                     <div className="flex-1">
                        <p className={`text-sm font-medium ${d.isCompleted ? 'line-through text-gray-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>{d.title}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 dark:text-slate-400">
                          {new Date(d.date).toLocaleDateString('pt-BR')}
                          {d.dispatchId && <span className="bg-gray-100 px-1 rounded text-[10px] dark:bg-slate-700 dark:text-slate-300">Ref: {d.dispatchId}</span>}
                        </p>
                     </div>
                     <button onClick={() => setDeadlineToDelete(d.id)} className="text-gray-300 hover:text-red-500 p-2 dark:text-slate-600 dark:hover:text-red-400">
                        <Trash2 size={16} />
                     </button>
                  </div>
                ))}
              </div>
            )}
           </div>

          <h3 className="font-bold text-slate-800 text-lg mt-6 dark:text-white">Histórico de Despachos</h3>
          
          <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-4 dark:border-slate-800">
             {process.dispatches.map((d, i) => (
               <div key={i} className="relative pl-6">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${d.status === DispatchStatus.PENDING_ACTION ? 'bg-red-500' : 'bg-gray-300 dark:bg-slate-700'}`} />
                  
                  <div className="flex flex-col gap-2">
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-gray-500 dark:text-slate-400">{d.date} • {d.code}</span>
                        {d.isCritical && <span className="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full dark:bg-red-900/30 dark:text-red-400">AÇÃO NECESSÁRIA</span>}
                     </div>
                     <p className="font-medium text-slate-800 text-sm leading-snug dark:text-slate-200">{d.description}</p>
                     
                     <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm mt-1 dark:bg-slate-900 dark:border-slate-800">
                        <p className="text-xs text-gray-500 mb-1 font-bold uppercase tracking-wider dark:text-slate-500">O que fazer:</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{d.actionGuidance}</p>
                        
                        <div className="flex flex-col gap-2 mt-3">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleAiExplain(d)}
                                className="flex-1 flex items-center gap-2 text-brand-600 text-xs font-bold hover:bg-brand-50 p-2 rounded-lg transition-colors justify-center border border-brand-100 dark:border-brand-900/30 dark:text-brand-400 dark:hover:bg-brand-900/20"
                              >
                                <Bot size={16} />
                                Explicação IA
                              </button>
                              <button 
                                onClick={() => handleOpenAddDeadline(d)}
                                className="flex-1 flex items-center gap-2 text-orange-600 text-xs font-bold hover:bg-orange-50 p-2 rounded-lg transition-colors justify-center border border-orange-100 dark:border-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/20"
                              >
                                <Bell size={16} />
                                Lembrete
                              </button>
                            </div>
                            
                            {/* Hire Specialist Button for Critical/Action items */}
                            {(d.status === DispatchStatus.PENDING_ACTION || d.isCritical) && (
                                <button 
                                  onClick={onHireSpecialist}
                                  className="w-full flex items-center gap-2 text-amber-700 text-xs font-bold bg-gradient-to-r from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 p-2 rounded-lg transition-colors justify-center border border-amber-300 shadow-sm dark:from-amber-900/40 dark:to-amber-800/40 dark:border-amber-700 dark:text-amber-200"
                                >
                                  <Star size={16} className="fill-current" />
                                  Contratar Especialista
                                </button>
                            )}
                        </div>
                     </div>
                  </div>
               </div>
             ))}
          </div>

          {/* Delete Process Section */}
          <div className="mt-8 pt-6 border-t border-gray-200 mb-6 dark:border-slate-800">
             <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full flex items-center justify-center gap-2 p-3 text-red-500 font-bold text-sm bg-red-50 rounded-xl hover:bg-red-100 transition-colors dark:bg-red-900/20 dark:hover:bg-red-900/30"
             >
                <Trash2 size={18} />
                Excluir Processo
             </button>
          </div>
       </div>

       {/* AI Modal/Overlay */}
       {selectedDispatch && (
         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => !thinking && setSelectedDispatch(null)}>
            <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 dark:bg-slate-900 dark:border dark:border-slate-700" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-3 mb-4">
                   <div className="bg-brand-100 p-2 rounded-full text-brand-600 dark:bg-brand-900 dark:text-brand-400">
                     <Bot size={24} />
                   </div>
                   <h3 className="font-bold text-lg dark:text-white">Explicação Inteligente</h3>
                </div>
                
                {thinking ? (
                  <div className="space-y-3 py-4">
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4 dark:bg-slate-800"></div>
                    <div className="h-4 bg-gray-100 rounded animate-pulse dark:bg-slate-800"></div>
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6 dark:bg-slate-800"></div>
                    <p className="text-xs text-gray-400 text-center mt-2">Consultando modelos jurídicos...</p>
                  </div>
                ) : (
                  <div className="prose prose-sm text-slate-600 dark:text-slate-300">
                     <p className="whitespace-pre-line leading-relaxed">{aiExplanation}</p>
                  </div>
                )}

                <Button className="mt-6" fullWidth onClick={() => setSelectedDispatch(null)} disabled={thinking}>
                  Entendi
                </Button>
            </div>
         </div>
       )}

       {/* Add Deadline Modal */}
       {showDeadlineModal && (
         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xs rounded-2xl p-5 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-700" onClick={e => e.stopPropagation()}>
               <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-lg dark:text-white">Novo Prazo</h3>
                 <button onClick={() => setShowDeadlineModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200"><Plus size={24} className="rotate-45"/></button>
               </div>
               
               <Input 
                 label="Título do Lembrete" 
                 value={newDeadlineData.title}
                 onChange={(e) => setNewDeadlineData({...newDeadlineData, title: e.target.value})}
                 placeholder="Ex: Responder oposição"
               />
               
               <Input 
                 label="Data Limite" 
                 type="date"
                 value={newDeadlineData.date}
                 onChange={(e) => setNewDeadlineData({...newDeadlineData, date: e.target.value})}
               />
               
               <p className="text-xs text-gray-500 mb-4 bg-yellow-50 p-2 rounded border border-yellow-100 flex gap-2 dark:bg-yellow-900/20 dark:border-yellow-900/40 dark:text-yellow-100">
                 <Bell size={12} className="mt-0.5 text-yellow-600 dark:text-yellow-400"/>
                 Você receberá uma notificação neste dia.
               </p>

               <div className="flex gap-2">
                 <Button variant="outline" fullWidth onClick={() => setShowDeadlineModal(false)}>Cancelar</Button>
                 <Button fullWidth onClick={handleSaveDeadline}>Salvar</Button>
               </div>
            </div>
         </div>
       )}

       {/* Delete Deadline Confirm Modal */}
       {deadlineToDelete && (
         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xs rounded-2xl p-6 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-700" onClick={e => e.stopPropagation()}>
               <div className="flex flex-col items-center text-center mb-4">
                 <div className="bg-red-100 p-3 rounded-full text-red-500 mb-3 dark:bg-red-900/20 dark:text-red-400">
                   <Trash2 size={32} />
                 </div>
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white">Excluir Prazo?</h3>
                 <p className="text-sm text-gray-500 mt-2 dark:text-slate-400">
                   Tem certeza que deseja remover este lembrete?
                 </p>
               </div>
               
               <div className="flex gap-3">
                 <button 
                    onClick={() => setDeadlineToDelete(null)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl dark:bg-slate-800 dark:text-slate-300"
                 >
                    Cancelar
                 </button>
                 <button 
                    onClick={confirmDeleteDeadline}
                    className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 dark:bg-red-600"
                 >
                    Excluir
                 </button>
               </div>
            </div>
         </div>
       )}

       {/* Delete Process Confirm Modal */}
       {showDeleteConfirm && (
         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xs rounded-2xl p-6 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-700" onClick={e => e.stopPropagation()}>
               <div className="flex flex-col items-center text-center mb-4">
                 <div className="bg-red-100 p-3 rounded-full text-red-500 mb-3 dark:bg-red-900/20 dark:text-red-400">
                   <AlertCircle size={32} />
                 </div>
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white">Excluir Processo?</h3>
                 <p className="text-sm text-gray-500 mt-2 dark:text-slate-400">
                   Tem certeza que deseja remover o processo <strong>{process.brandName}</strong>? Esta ação não pode ser desfeita.
                 </p>
               </div>
               
               <div className="flex gap-3">
                 <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl dark:bg-slate-800 dark:text-slate-300"
                 >
                    Cancelar
                 </button>
                 <button 
                    onClick={() => onDelete(process.id)}
                    className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 dark:bg-red-600"
                 >
                    Excluir
                 </button>
               </div>
            </div>
         </div>
       )}
    </div>
  );
};

// 6. Specialist Triage
const SpecialistTriage = ({ onSelect, onBack }: { onSelect: (category: string) => void, onBack: () => void }) => {
    const categories = [
        { id: 'Registro de Marca', icon: Plus, desc: 'Entrada com pedido, emissão de GRU e análise de viabilidade.' },
        { id: 'Oposição ou Defesa', icon: ShieldAlert, desc: 'Defender sua marca contra terceiros ou responder oposições.' },
        { id: 'Recurso', icon: Scale, desc: 'Recorrer de uma decisão de indeferimento do INPI.' },
        { id: 'Acompanhamento', icon: FileSearch, desc: 'Vigilância e monitoramento semanal da sua marca.' },
        { id: 'Consultoria Geral', icon: HelpCircle, desc: 'Dúvidas diversas sobre propriedade intelectual.' }
    ];

    return (
        <div className="flex flex-col h-full bg-gray-50 pb-20 dark:bg-slate-950 transition-colors">
            <div className="bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-2 sticky top-0 z-30 dark:bg-slate-900 dark:border-slate-800">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full dark:hover:bg-slate-800">
                    <ArrowLeft size={24} className="text-slate-700 dark:text-white" />
                </button>
                <span className="font-bold text-slate-800 truncate dark:text-white">Ajuda Especializada</span>
            </div>

            <div className="p-4 overflow-y-auto no-scrollbar">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Como podemos te ajudar?</h2>
                    <p className="text-gray-500 dark:text-slate-400">Selecione o tipo de serviço para encontrarmos o especialista ideal para o seu caso.</p>
                </div>

                <div className="grid gap-3">
                    {categories.map(cat => (
                        <Card key={cat.id} onClick={() => onSelect(cat.id)} className="flex items-center gap-4 hover:border-amber-400 cursor-pointer group active:bg-amber-50 dark:active:bg-slate-800">
                            <div className="p-3 bg-amber-100 text-amber-600 rounded-full group-hover:bg-amber-500 group-hover:text-white transition-colors dark:bg-amber-900/30 dark:text-amber-400">
                                <cat.icon size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800 dark:text-white">{cat.id}</h3>
                                <p className="text-xs text-gray-500 dark:text-slate-400">{cat.desc}</p>
                            </div>
                            <ChevronRight size={20} className="text-gray-300 group-hover:text-amber-500 dark:text-slate-600" />
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 7. Specialist Directory
const SpecialistDirectory = ({ category, onBack, onStartChat }: { category?: string, onBack: () => void, onStartChat: (s: Specialist) => void }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 dark:bg-slate-950 transition-colors">
       <div className="bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-2 sticky top-0 z-30 dark:bg-slate-900 dark:border-slate-800">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full dark:hover:bg-slate-800">
            <ArrowLeft size={24} className="text-slate-700 dark:text-white" />
          </button>
          <span className="font-bold text-slate-800 truncate dark:text-white">Especialistas</span>
       </div>

       <div className="p-4 space-y-4 overflow-y-auto no-scrollbar">
          {category && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 dark:text-slate-400">
                  <span>Buscando especialistas em:</span>
                  <span className="font-bold text-slate-800 bg-gray-100 px-2 py-0.5 rounded dark:bg-slate-800 dark:text-white">{category}</span>
              </div>
          )}

          <div className="bg-amber-100 border border-amber-200 rounded-xl p-4 mb-4 dark:bg-amber-900/30 dark:border-amber-800">
             <div className="flex gap-3">
                <Star className="text-amber-600 shrink-0 mt-1 dark:text-amber-400" />
                <div>
                  <h3 className="font-bold text-amber-800 text-sm mb-1 dark:text-amber-300">Profissionais Parceiros</h3>
                  <p className="text-xs text-amber-700 dark:text-amber-400/80">
                    Advogados especializados em propriedade intelectual prontos para resolver as exigências e oposições do seu processo.
                  </p>
                </div>
             </div>
          </div>

          {MOCK_SPECIALISTS.map(spec => (
            <Card key={spec.id} className="flex gap-4 p-4 border-l-4 border-l-amber-500">
               <img src={spec.imageUrl} alt={spec.name} className="w-16 h-16 rounded-full object-cover bg-gray-200" />
               <div className="flex-1">
                 <div className="flex justify-between items-start">
                   <h3 className="font-bold text-slate-800 dark:text-white">{spec.name}</h3>
                   <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-1.5 py-0.5 rounded dark:bg-amber-900/30">
                     <Star size={10} fill="currentColor" /> {spec.rating}
                   </div>
                 </div>
                 <p className="text-xs text-gray-400 mb-1">{spec.oab}</p>
                 <p className="text-xs text-slate-600 font-medium mb-3 dark:text-slate-400">{spec.specialty}</p>
                 
                 <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500 dark:text-slate-500">A partir de <strong className="text-slate-800 dark:text-white">{spec.priceStart}</strong></span>
                    <button 
                      onClick={() => onStartChat(spec)}
                      className="bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-slate-700 transition-colors dark:bg-brand-600 dark:hover:bg-brand-500"
                    >
                      <MessageSquare size={14} />
                      Contratar / Chat
                    </button>
                 </div>
               </div>
            </Card>
          ))}
       </div>
    </div>
  );
};

// 8. Chat Screen
const ChatScreen = ({ chat, specialist, onBack, onUpdateChat }: { chat: Chat, specialist: Specialist, onBack: () => void, onUpdateChat: (c: Chat) => void }) => {
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat.messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    setSending(true);

    const textToSend = inputText;
    setInputText(''); // Optimistic clear

    // 1. Send User Message
    const userMsg = await MockApiService.sendMessage(textToSend);
    const updatedChatWithUser = {
      ...chat,
      messages: [...chat.messages, userMsg],
      lastUpdate: new Date().toISOString()
    };
    onUpdateChat(updatedChatWithUser);
    setSending(false);

    // 2. Simulate Reply
    const replyMsg = await MockApiService.receiveMockReply();
    const finalChat = {
       ...updatedChatWithUser,
       messages: [...updatedChatWithUser.messages, replyMsg],
       lastUpdate: new Date().toISOString()
    };
    onUpdateChat(finalChat);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center gap-3 sticky top-0 z-30 dark:bg-slate-900 dark:border-slate-800">
         <button onClick={onBack} className="p-1 -ml-1 hover:bg-gray-100 rounded-full dark:hover:bg-slate-800">
           <ArrowLeft size={24} className="text-slate-700 dark:text-white" />
         </button>
         <div className="relative">
           <img src={specialist.imageUrl} className="w-10 h-10 rounded-full object-cover" alt="Avatar"/>
           <div className="w-3 h-3 bg-green-500 border-2 border-white rounded-full absolute bottom-0 right-0 dark:border-slate-900"></div>
         </div>
         <div className="flex-1">
           <h3 className="font-bold text-slate-800 text-sm leading-tight dark:text-white">{specialist.name}</h3>
           <p className="text-xs text-green-600 font-medium dark:text-green-400">Online agora</p>
         </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
         <div className="text-center">
            <span className="text-xs text-gray-400 bg-gray-200 px-3 py-1 rounded-full dark:bg-slate-800 dark:text-slate-500">Hoje</span>
         </div>
         
         {chat.messages.map(msg => (
           <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm text-sm ${
                msg.sender === 'user' 
                ? 'bg-brand-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none dark:bg-slate-800 dark:text-slate-200'
              }`}>
                 <p>{msg.text}</p>
                 <span className={`text-[10px] block text-right mt-1 opacity-70 ${msg.sender === 'user' ? 'text-brand-100' : 'text-gray-400'}`}>
                   {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                 </span>
              </div>
           </div>
         ))}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 dark:bg-slate-900 dark:border-slate-800 pb-safe">
         <input 
           className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500 dark:bg-slate-800 dark:text-white"
           placeholder="Digite sua mensagem..."
           value={inputText}
           onChange={e => setInputText(e.target.value)}
           onKeyDown={e => e.key === 'Enter' && handleSend()}
         />
         <button 
           onClick={handleSend}
           disabled={!inputText.trim() || sending}
           className="bg-brand-600 text-white p-3 rounded-full hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
         >
           <Send size={20} />
         </button>
      </div>
    </div>
  );
};

// 9. Add Process (Search)
const AddProcess = ({ onSave, onCancel }: { onSave: (p: Process) => void, onCancel: () => void }) => {
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Process | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (number.length < 5) return;
    setLoading(true);
    setResult(null);
    setError('');

    try {
      // Create a full Process object from the Mock response
      const mockResponse = await MockApiService.searchByNumber(number);
      if (mockResponse) {
        setResult({
          id: Date.now().toString(), // Generate temp ID
          inpiNumber: mockResponse.number,
          brandName: mockResponse.brand,
          niceClass: mockResponse.class,
          owner: mockResponse.owner,
          specification: mockResponse.specification,
          status: mockResponse.status,
          dispatches: mockResponse.dispatches,
          deadlines: [], // Initialize empty deadlines
          lastUpdate: new Date().toISOString()
        });
      } else {
        setError('Processo não encontrado. Tente 987654321.');
      }
    } catch (e) {
      setError('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 pb-24">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Novo Processo</h2>
      
      <div className="space-y-4">
        <Input 
          label="Número do Processo (INPI)" 
          placeholder="Ex: 987654321" 
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          type="number"
        />
        <Button onClick={handleSearch} loading={loading} disabled={!number} fullWidth variant="outline">
          Pesquisar
        </Button>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-center text-sm font-medium dark:bg-red-900/20 dark:text-red-300">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 mb-2 text-emerald-600 font-bold text-sm dark:text-emerald-400">
             <CheckCircle size={16} /> Processo Encontrado
          </div>
          <Card className="border-emerald-100 bg-emerald-50/30 mb-4 dark:bg-emerald-900/10 dark:border-emerald-900/30">
            <h3 className="font-bold text-lg dark:text-white">{result.brandName}</h3>
            <p className="text-sm text-gray-600 mb-2 dark:text-slate-400">Classe {result.niceClass} • {result.owner}</p>
            <div className="text-xs bg-white p-2 rounded border border-gray-100 text-gray-500 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400">
               {result.specification}
            </div>
          </Card>
          <Button onClick={() => onSave(result)} fullWidth>
            Monitorar esta Marca
          </Button>
        </div>
      )}
    </div>
  );
};

// 10. Education Section & Article Detail
const ArticleDetail = ({ article, onBack }: { article: Article, onBack: () => void }) => {
   return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 dark:bg-slate-950 transition-colors">
       <div className="bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-2 sticky top-0 z-30 dark:bg-slate-900 dark:border-slate-800">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full dark:hover:bg-slate-800">
            <ArrowLeft size={24} className="text-slate-700 dark:text-white" />
          </button>
          <span className="font-bold text-slate-800 truncate dark:text-white">{article.title}</span>
       </div>
       
       <div className="p-6 overflow-y-auto no-scrollbar">
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-900 dark:border-slate-800">
             <h1 className="text-2xl font-bold text-brand-900 mb-4 dark:text-brand-100">{article.title}</h1>
             <div className="text-sm text-gray-500 mb-6 italic border-l-4 border-brand-200 pl-4 py-1 bg-brand-50 rounded-r dark:bg-brand-900/20 dark:border-brand-800 dark:text-slate-400">
                {article.summary}
             </div>
             
             <div 
               className="article-content"
               dangerouslySetInnerHTML={{ __html: article.content }} 
             />
           </div>
           
           <div className="mt-8 text-center text-xs text-gray-400 dark:text-slate-600">
             <p>Fonte: Base de Conhecimento Marca em Dia</p>
             <p className="mt-1">Conteúdo informativo. Consulte sempre o manual oficial do INPI.</p>
           </div>
       </div>
    </div>
   );
}

const Education = ({ onSelectArticle }: { onSelectArticle: (a: Article) => void }) => {
  return (
    <div className="p-4 pb-24 space-y-4">
       <div className="bg-purple-600 rounded-2xl p-6 text-white shadow-lg mb-6 dark:bg-purple-800">
          <h2 className="text-2xl font-bold mb-2">Aprenda</h2>
          <p className="text-purple-100">Domine o processo de registro e evite erros comuns.</p>
       </div>

       {EDUCATION_ARTICLES.map(art => (
         <Card key={art.id} onClick={() => onSelectArticle(art)} className="active:bg-gray-50 dark:active:bg-slate-800">
            <h3 className="font-bold text-slate-800 mb-1 dark:text-white">{art.title}</h3>
            <p className="text-sm text-gray-500 mb-3 dark:text-slate-400">{art.summary}</p>
            <div className="flex items-center text-purple-600 text-xs font-bold gap-1 dark:text-purple-400">
              Ler artigo <ChevronRight size={14} />
            </div>
         </Card>
       ))}
       
       <button className="w-full py-4 text-center text-gray-400 text-sm flex items-center justify-center gap-2 mt-8 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300">
         <ExternalLink size={14} />
         Visitar portal oficial do INPI
       </button>
    </div>
  );
};

// 11. Profile
const Profile = ({ user, onLogout, darkMode, onToggleTheme, onOpenMessages }: { user: User, onLogout: () => void, darkMode: boolean, onToggleTheme: () => void, onOpenMessages: () => void }) => (
  <div className="p-4 pb-24">
    <div className="flex flex-col items-center py-8">
      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500 mb-4 dark:bg-slate-800 dark:text-slate-400">
        {user.name.charAt(0)}
      </div>
      <h2 className="text-xl font-bold dark:text-white">{user.name}</h2>
      <p className="text-gray-500 text-sm dark:text-slate-400">{user.email}</p>
      <span className="mt-2 px-3 py-1 bg-brand-100 text-brand-700 text-xs rounded-full font-bold dark:bg-brand-900/30 dark:text-brand-300">
        {user.type}
      </span>
    </div>

    <div className="space-y-2 mt-6">
      <Card className="flex justify-between items-center p-4" onClick={onOpenMessages}>
         <div className="flex items-center gap-3">
             <div className="p-1.5 rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-300">
                 <MessageSquare size={18} />
             </div>
             <span className="dark:text-white">Minhas Mensagens</span>
         </div>
         <ChevronRight size={18} className="text-gray-400"/>
      </Card>

      <Card className="flex justify-between items-center p-4">
         <div className="flex items-center gap-3">
             <div className="p-1.5 rounded-full bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300">
                 <Bell size={18} />
             </div>
             <span className="dark:text-white">Notificações</span>
         </div>
         <div className="w-10 h-6 bg-brand-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div></div>
      </Card>
      
      {/* Dark Mode Toggle */}
      <Card className="flex justify-between items-center p-4" onClick={onToggleTheme}>
         <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-full ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-yellow-100 text-yellow-600'}`}>
              {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            </div>
            <span className="dark:text-white">Modo Escuro</span>
         </div>
         <div className={`w-12 h-7 rounded-full transition-colors duration-300 relative ${darkMode ? 'bg-brand-600' : 'bg-gray-300 dark:bg-slate-700'}`}>
            <div className={`w-5 h-5 bg-white rounded-full absolute top-1 shadow-sm transition-transform duration-300 ${darkMode ? 'left-6' : 'left-1'}`}></div>
         </div>
      </Card>

      <Button onClick={onLogout} variant="ghost" fullWidth className="text-red-500 hover:bg-red-50 mt-8 dark:hover:bg-red-900/20">
        Sair da conta
      </Button>
    </div>
  </div>
);

// 12. Messages List (Inbox)
const MessagesList = ({ chats, specialists, onSelectChat, onBack }: { chats: Chat[], specialists: Specialist[], onSelectChat: (c: Chat) => void, onBack: () => void }) => {
    return (
        <div className="flex flex-col h-full bg-gray-50 pb-20 dark:bg-slate-950 transition-colors">
            <div className="bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-2 sticky top-0 z-30 dark:bg-slate-900 dark:border-slate-800">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full dark:hover:bg-slate-800">
                    <ArrowLeft size={24} className="text-slate-700 dark:text-white" />
                </button>
                <span className="font-bold text-slate-800 truncate dark:text-white">Mensagens</span>
            </div>
            
            <div className="p-4 space-y-3 overflow-y-auto no-scrollbar flex-1">
                {chats.length === 0 ? (
                     <div className="text-center py-20">
                        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-slate-800">
                            <MessageSquare size={40} className="text-gray-400 dark:text-slate-600" />
                        </div>
                        <h3 className="text-gray-600 font-medium dark:text-slate-400">Nenhuma conversa</h3>
                        <p className="text-gray-400 text-sm mt-1 dark:text-slate-500">Contrate um especialista para iniciar um chat.</p>
                     </div>
                ) : (
                    chats.map(chat => {
                        const specialist = specialists.find(s => s.id === chat.specialistId);
                        const lastMsg = chat.messages[chat.messages.length - 1];
                        if (!specialist) return null;

                        return (
                            <Card key={chat.id} onClick={() => onSelectChat(chat)} className="flex items-center gap-3 active:bg-gray-50 dark:active:bg-slate-800">
                                <img src={specialist.imageUrl} className="w-12 h-12 rounded-full object-cover" alt={specialist.name} />
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-slate-800 truncate dark:text-white">{specialist.name}</h3>
                                        <span className="text-[10px] text-gray-400 whitespace-nowrap">
                                            {new Date(lastMsg.timestamp).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate dark:text-slate-400">
                                        {lastMsg.sender === 'user' ? 'Você: ' : ''}{lastMsg.text}
                                    </p>
                                </div>
                            </Card>
                        )
                    })
                )}
            </div>
        </div>
    )
}

// --- Main App Logic ---

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [processes, setProcesses] = useState<Process[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  
  // Article State
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Chat State
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [showMessagesList, setShowMessagesList] = useState(false);
  
  // Specialist Triage State
  const [specialistService, setSpecialistService] = useState<string | null>(null);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage for auth and theme
    const storedUser = localStorage.getItem('mm_user');
    const storedProcesses = localStorage.getItem('mm_processes');
    const storedTheme = localStorage.getItem('mm_theme');
    const storedChats = localStorage.getItem('mm_chats');
    
    // Init Theme
    if (storedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    const init = async () => {
      await new Promise(r => setTimeout(r, 2000)); // Splash delay

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedProcesses) {
        setProcesses(JSON.parse(storedProcesses));
      }
      if (storedChats) {
        setChats(JSON.parse(storedChats));
      }
      setLoading(false);
    };
    init();
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mm_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mm_theme', 'light');
    }
  };

  const handleLogin = (u: User) => {
    setUser(u);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('mm_user');
    localStorage.removeItem('mm_token');
    setUser(null);
  };

  const handleAddProcess = (p: Process) => {
    const newProcesses = [...processes, p];
    setProcesses(newProcesses);
    localStorage.setItem('mm_processes', JSON.stringify(newProcesses));
    setActiveTab('processes');
  };

  const handleUpdateProcess = (updatedProcess: Process) => {
    const newProcesses = processes.map(p => p.id === updatedProcess.id ? updatedProcess : p);
    setProcesses(newProcesses);
    localStorage.setItem('mm_processes', JSON.stringify(newProcesses));
    setSelectedProcess(updatedProcess);
  };

  const handleDeleteProcess = (id: string) => {
    const newProcesses = processes.filter(p => p.id !== id);
    setProcesses(newProcesses);
    localStorage.setItem('mm_processes', JSON.stringify(newProcesses));
    setSelectedProcess(null); // Go back to list
  };
  
  const handleHireSpecialistFromProcess = () => {
     setSelectedProcess(null);
     // Pre-select service based on generic need (improvement: could be context aware)
     setSpecialistService('Resolução de Exigência / Oposição');
     setActiveTab('specialists');
  };

  // Chat Logic
  const handleStartChat = (specialist: Specialist) => {
      let chat = chats.find(c => c.specialistId === specialist.id);
      
      if (!chat) {
          const newChat: Chat = {
              id: Date.now().toString(),
              specialistId: specialist.id,
              messages: [INITIAL_CHAT_MESSAGE],
              lastUpdate: new Date().toISOString()
          };
          const newChats = [...chats, newChat];
          setChats(newChats);
          localStorage.setItem('mm_chats', JSON.stringify(newChats));
          chat = newChat;
      }
      
      setActiveChat(chat);
  };

  const handleUpdateChat = (updatedChat: Chat) => {
      const newChats = chats.map(c => c.id === updatedChat.id ? updatedChat : c);
      setChats(newChats);
      localStorage.setItem('mm_chats', JSON.stringify(newChats));
      setActiveChat(updatedChat);
  };
  
  // Calculate unread messages count (Count conversations with unread messages)
  const unreadCount = chats.filter(chat => 
     chat.messages.some(m => m.sender === 'specialist' && !m.isRead)
  ).length;

  const renderContent = () => {
    if (activeChat) {
        const specialist = MOCK_SPECIALISTS.find(s => s.id === activeChat.specialistId);
        if (specialist) {
            return (
                <ChatScreen 
                    chat={activeChat}
                    specialist={specialist}
                    onBack={() => setActiveChat(null)}
                    onUpdateChat={handleUpdateChat}
                />
            );
        }
    }

    if (showMessagesList) {
        return (
            <MessagesList 
                chats={chats}
                specialists={MOCK_SPECIALISTS}
                onSelectChat={setActiveChat}
                onBack={() => setShowMessagesList(false)}
            />
        )
    }

    if (selectedProcess) {
      return (
        <ProcessDetail 
          process={selectedProcess} 
          onBack={() => setSelectedProcess(null)} 
          onUpdateProcess={handleUpdateProcess} 
          onDelete={handleDeleteProcess}
          onHireSpecialist={handleHireSpecialistFromProcess}
        />
      );
    }
    
    if (selectedArticle) {
      return (
        <ArticleDetail 
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard processes={processes} onChangeTab={setActiveTab} onSelect={setSelectedProcess} />;
      case 'processes':
        return <ProcessList processes={processes} onSelect={setSelectedProcess} />;
      case 'add':
        return <AddProcess onSave={handleAddProcess} onCancel={() => setActiveTab('dashboard')} />;
      case 'education':
        return <Education onSelectArticle={setSelectedArticle} />;
      case 'profile':
        return user ? (
          <Profile 
            user={user} 
            onLogout={handleLogout} 
            darkMode={darkMode} 
            onToggleTheme={toggleTheme}
            onOpenMessages={() => setShowMessagesList(true)}
          />
        ) : null;
      case 'specialists':
        if (specialistService) {
            return <SpecialistDirectory category={specialistService} onBack={() => setSpecialistService(null)} onStartChat={handleStartChat} />;
        }
        return <SpecialistTriage onSelect={setSpecialistService} onBack={() => setActiveTab('dashboard')} />;
      default:
        return <Dashboard processes={processes} onChangeTab={setActiveTab} onSelect={setSelectedProcess} />;
    }
  };

  const getTitle = () => {
    if (activeChat) return 'Chat';
    if (showMessagesList) return 'Mensagens';
    if (selectedProcess) return 'Detalhes';
    if (selectedArticle) return 'Leitura';
    const titles: Record<string, string> = {
      dashboard: 'Marca em Dia',
      processes: 'Seus Processos',
      add: 'Nova Marca',
      education: 'Central de Ajuda',
      profile: 'Perfil',
      specialists: 'Especialistas'
    };
    return titles[activeTab] || 'Marca em Dia';
  };

  // Only show nav for main screens
  const shouldShowNav = !selectedProcess && !selectedArticle && !activeChat && !showMessagesList && activeTab !== 'specialists';
  
  // Show header on dashboard, processes, education, profile (when not deep linked)
  const shouldShowHeader = !selectedProcess && !selectedArticle && !activeChat && !showMessagesList && activeTab !== 'specialists';

  if (loading) return <MobileShell><SplashScreen /></MobileShell>;

  if (!user) {
    return (
      <MobileShell>
         <AuthScreen onLogin={handleLogin} />
      </MobileShell>
    );
  }

  return (
    <HashRouter>
      <MobileShell>
        {shouldShowHeader && (
          <Header 
            title={getTitle()} 
            onChatClick={() => setShowMessagesList(true)}
            unreadCount={unreadCount}
          />
        )}
        
        <div className="flex-1 overflow-y-auto no-scrollbar h-full relative">
          {renderContent()}
        </div>

        {shouldShowNav && (
          <BottomNav 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            onLogout={handleLogout} 
          />
        )}
      </MobileShell>
    </HashRouter>
  );
};

export default App;
