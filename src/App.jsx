import { useState, useEffect, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { 
  Sprout, 
  Plus, 
  Trash2, 
  ShoppingCart,
  Printer, 
  BookOpen, 
  LayoutDashboard,
  ClipboardList,
  HelpCircle,
  Info,
  Search,
  RotateCcw, 
  AlertTriangle, 
  Moon, 
  Sun, 
  CheckCircle,
  Archive,
  ArrowDownLeft,
  ArrowUpRight,
  X,
  Settings,
  Pencil,
  Save,
  Wallet,
  Calculator,
  PackageOpen,
  Menu,
  FileDown
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    title: "Jaye Coco Ledger",
    subtitle: "Simple Billing & Accounting",
    historyLogs: "History Logs",
    calculatorTitle: "Calculator & Bill Maker",
    direction: "Transaction Direction",
    purchase: "Purchase / Supply",
    sale: "Sale / Customer",
    qty: "Coconut Quantity",
    unitPrice: "Unit Price (Rs.)",
    nameSupplier: "Supplier Name",
    nameCustomer: "Customer Name",
    phone: "Phone Number",
    billNumber: "Bill Number",
    adjustmentType: "Adjustment Type",
    addPrevBalance: "Add Previous Balance (+)",
    subAdvance: "Sub Advance Amount (-)",
    adjustmentValue: "Adjustment Value (Rs.)",
    grossTotal: "Gross Total",
    formula: "Calculator Formula",
    netAmount: "Final Net Amount",
    printAndSave: "Print Bill & Save (Enter)",
    recordPaymentAndSave: "Save Payment (Enter)",
    activeLedger: "Active Ledger Book Page",
    closePage: "Close Page & Start New",
    manualEntry: "Manual Ledger Entry",
    huskedStock: "Husked Stock",
    dailyCost: "Daily Cost / Expense",
    manualIncome: "Manual Income",
    huskedQty: "Husked Qty",
    laborPrice: "Labor Price per PC",
    expenseDesc: "Expense Description",
    amount: "Amount (Rs.)",
    incomeDesc: "Income Description",
    addEntry: "Add Entry",
    time: "Time",
    description: "Description",
    type: "Type",
    adjustment: "Adjustment",
    income: "Income",
    expense: "Expense",
    actions: "Actions",
    coconutsCollected: "Coconuts Purchased",
    coconutsSold: "Coconuts Sold",
    huskedStocks: "Husked Stocks",
    ledgerBalance: "Ledger Balance",
    profitLossTitle: "Final Profit & Loss Summary",
    expenseSide: "Expense Side",
    incomeSide: "Income Side",
    coProductIncome: "Co-Product Income / Husk Sales",
    huskType1: "Husk Type 1 Sales",
    huskType2: "Husk Type 2 Sales",
    netProfitLoss: "Net Profit / Loss",
    archiveConfirmTitle: "Close Active Ledger Page?",
    archiveConfirmDesc: "This will archive the current transactions, counts, and Profit/Loss totals, and clear your active sheet to start a new ledger.",
    cancel: "Cancel",
    confirmArchive: "Yes, Archive Page",
    historyTitle: "Archived Ledger History",
    clearHistory: "Clear History",
    historyEmpty: "No archived ledger pages yet.",
    closedPage: "Closed Page",
    totalCoconuts: "Total Coconuts",
    archivedProfit: "Archived Profit",
    transactionsLog: "Transactions Log",
    thankYou: "Thank You For Your Business!",
    softwareGenerated: "Software Generated Receipt",
    enterPlaceholder: "Press Enter to submit",
    outstanding: "Outstanding",
    // Error / Success messages
    errQty: "Please enter a valid Quantity",
    errPrice: "Please enter a valid Unit Price",
    errName: "Please enter customer/supplier name for payments",
    errExpenseDesc: "Please enter expense description",
    errExpenseAmt: "Please enter valid amount",
    errIncomeDesc: "Please enter income description",
    errIncomeAmt: "Please enter valid amount",
    successBill: "Bill prepared for printing & committed to ledger",
    successHusk: "Husked stock and labor logged successfully",
    successExpense: "Expense logged successfully",
    successIncome: "Income logged successfully",
    successRemove: "Transaction removed successfully",
    successArchive: "Ledger page closed and archived successfully",
    confirmClearHistory: "Are you sure you want to clear the entire history?",
    successClearHistory: "All history logs cleared",
    outstandingOwedToUs: "Owed to us",
    outstandingWeOwe: "We owe",
    paymentReceived: "Payment Received",
    paymentMade: "Payment Made",
    supplierSupply: "Supplier Supply",
    customerPurchase: "Customer Purchase",
    peelingLabor: "peeling labor cost",
    huskedCoconutsDesc: "husked coconuts",
    dailyCostDesc: "daily cost",
    manualIncomeDesc: "manual income"
  },
  si: {
    title: "ජය කෝකෝ ලෙජරය",
    subtitle: "පොල් බෙදාහැරීම් සහ ගිණුම්කරණ ලෙජරය",
    historyLogs: "ඉතිහාස සටහන්",
    calculatorTitle: "කැල්කියුලේටරය සහ බිල්පත් සාදන්නා",
    direction: "ගනුදෙනු දිශාව",
    purchase: "ගැනුම් පොල් / සැපයුම",
    sale: "විකුණුම් පොල් / පාරිභෝගිකයා",
    qty: "පොල් ගෙඩි ගණන",
    unitPrice: "තනි ගෙඩියක මිල (රු.)",
    nameSupplier: "සැපයුම්කරුගේ නම",
    nameCustomer: "පාරිභෝගිකයාගේ නම",
    phone: "දුරකථන අංකය",
    billNumber: "බිල්පත් අංකය",
    adjustmentType: "ගැලපුම් වර්ගය",
    addPrevBalance: "කලින් හිඟ මුදල් එකතු කරන්න (+)",
    subAdvance: "අත්තිකාරම් මුදල් අඩු කරන්න (-)",
    adjustmentValue: "ගැලපුම් අගය (රු.)",
    grossTotal: "මුළු මුදල",
    formula: "ගණනය කිරීමේ ක්‍රමය",
    netAmount: "අවසාන ශුද්ධ මුදල",
    printAndSave: "බිල මුද්‍රණය කර සුරකින්න (Enter)",
    recordPaymentAndSave: "ගෙවීම සුරකින්න (Enter)",
    activeLedger: "වත්මන් ලෙජරය",
    closePage: "පිටුව වසා අලුත් පිටුවක්",
    manualEntry: "පොතේ අතින් සටහන් කිරීම",
    huskedStock: "ලෙලි ගසන ලද පොල්",
    dailyCost: "වියදම් / ගෙවීම්",
    manualIncome: "අමතර ආදායම්",
    huskedQty: "ලෙලි ගසන ලද ගණන",
    laborPrice: "ගෙඩියක ලෙලි කුලිය",
    expenseDesc: "වියදම් විස්තරය",
    amount: "මුදල (රු.)",
    incomeDesc: "ආදායම් විස්තරය",
    addEntry: "ඇතුළත් කරන්න",
    time: "වේලාව",
    description: "විස්තරය",
    type: "වර්ගය",
    adjustment: "ගැලපුම්",
    income: "ආදායම",
    expense: "වියදම",
    actions: "ක්‍රියාකාරකම්",
    coconutsCollected: "මිලදී ගත් පොල්",
    coconutsSold: "විකුණූ පොල්",
    huskedStocks: "ලෙලි තොග",
    ledgerBalance: "ලෙජර් ශේෂය",
    profitLossTitle: "අවසාන ලාභ සහ අලාභ සාරාංශය",
    expenseSide: "වියදම් පාර්ශවය",
    incomeSide: "ආදායම් පාර්ශවය",
    coProductIncome: "ලෙලි විකිණීමේ ආදායම",
    huskType1: "1 වර්ගයේ ලෙලි ආදායම",
    huskType2: "2 වර්ගයේ ලෙලි ආදායම",
    netProfitLoss: "ශුද්ධ ලාභය / අලාභය",
    archiveConfirmTitle: "වත්මන් ලෙජර් පිටුව වසන්නද?",
    archiveConfirmDesc: "මෙය වත්මන් ගනුදෙනු ලේඛනගත කර නව ලෙජරයක් ආරම්භ කිරීමට වත්මන් පිටුව හිස් කරයි.",
    cancel: "අවලංගු කරන්න",
    confirmArchive: "ඔව්, වසා දමන්න",
    historyTitle: "ලේඛනගත ඉතිහාසය",
    clearHistory: "ඉතිහාසය මකන්න",
    historyEmpty: "තවමත් ලේඛනගත පිටු නොමැත.",
    closedPage: "වසා දැමූ පිටුව",
    totalCoconuts: "මුළු පොල් ප්‍රමාණය",
    archivedProfit: "ලැබුණු ලාභය",
    transactionsLog: "ගනුදෙනු ලේඛනය",
    thankYou: "ඔබගේ ගනුදෙනුවට ස්තූතියි!",
    softwareGenerated: "පරිගණකයෙන් ජනනය කරන ලද රිසිට්පතකි",
    enterPlaceholder: "ඇතුළත් කිරීමට Enter ඔබන්න",
    outstanding: "හිඟ මුදල",
    // Error / Success messages
    errQty: "කරුණාකර පොල් ගෙඩි ගණන ඇතුළත් කරන්න",
    errPrice: "කරුණාකර තනි ගෙඩියක මිල ඇතුළත් කරන්න",
    errName: "කරුණාකර ගෙවීම් සඳහා නමක් ඇතුළත් කරන්න",
    errExpenseDesc: "කරුණාකර වියදම් විස්තරය ඇතුළත් කරන්න",
    errExpenseAmt: "කරුණාකර වලංගු වියදම් මුදලක් ඇතුළත් කරන්න",
    errIncomeDesc: "කරුණාකර ආදායම් විස්තරය ඇතුළත් කරන්න",
    errIncomeAmt: "කරුණාකර වලංගු ආදායම් මුදලක් ඇතුළත් කරන්න",
    successBill: "බිල මුද්‍රණය සඳහා සූදානම් කර ලෙජරයට එක් කරන ලදී",
    successHusk: "ලෙලි ගසන ලද තොග සාර්ථකව එක් කරන ලදී",
    successExpense: "වියදම සාර්ථකව එක් කරන ලදී",
    successIncome: "ආදායම සාර්ථකව එක් කරන ලදී",
    successRemove: "සටහන සාර්ථකව ඉවත් කරන ලදී",
    successArchive: "ලෙජර් පිටුව සාර්ථකව වසා ලේඛනාගාරයට එක් කරන ලදී",
    confirmClearHistory: "ඔබට නිසැකවම මුළු ලේඛන ඉතිහාසයම මකා දැමීමට අවශ්‍යද?",
    successClearHistory: "සියලුම ඉතිහාස සටහන් මකා දමන ලදී",
    outstandingOwedToUs: "අපට ලැබිය යුතු",
    outstandingWeOwe: "අප ගෙවිය යුතු",
    paymentReceived: "ලැබුණු මුදල්",
    paymentMade: "ගෙවූ මුදල්",
    supplierSupply: "සැපයුම්කරුගේ සැපයුම",
    customerPurchase: "පාරිභෝගික මිලදී ගැනීම",
    peelingLabor: "ලෙලි ගැසීමේ කුලිය",
    huskedCoconutsDesc: "ලෙලි ගසන ලද පොල් තොග",
    dailyCostDesc: "වියදම",
    manualIncomeDesc: "අමතර ආදායම"
  }
};

// Formatting helper for currency display
const formatCurrency = (val) => {
  const num = parseFloat(val);
  if (isNaN(num)) return 'Rs. 0.00';
  return 'Rs. ' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const createId = (prefix) => `${prefix}_${Date.now()}`;
const formatLocalDate = () => new Date().toLocaleDateString();
const formatLocalTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const formatInputDate = () => new Date().toISOString().slice(0, 10);

const POS_ITEM_PRESETS = {
  husk: {
    itemType: 'husk',
    itemDescription: 'Coconut Husk / හස්ක්',
    itemUnit: 'kg'
  },
  coconut: {
    itemType: 'coconut',
    itemDescription: 'Coconuts / පොල්',
    itemUnit: 'pcs'
  }
};

const getPosItemPreset = (itemType = 'husk') => POS_ITEM_PRESETS[itemType] || POS_ITEM_PRESETS.husk;

// Initial states
const initialPOSState = {
  qty: '',
  price: '',
  balanceType: 'subtract', // default to subtract for advances
  adjustment: '',
  settlement: '',
  type: 'purchase', // purchase = supplier supply, sale = buyer purchase
  name: '',
  phone: '',
  billNumber: '',
  date: formatInputDate(),
  ...POS_ITEM_PRESETS.husk
};

const createPOSState = (type = 'purchase', itemType = 'husk') => ({
  ...initialPOSState,
  ...getPosItemPreset(itemType),
  type,
  date: formatInputDate()
});

const initialLedgerState = {
  id: '',
  startDate: '',
  transactions: [],
  huskedCoconutsCount: 0,
  dailyCosts: 0
};

const initialHuskState = {
  qty: '',
  haulingRate: '',
  cuttingWages: '',
  dryingWages: '',
  weight1000: ''
};

const initialHuskLedgerState = {
  id: '',
  startDate: '',
  records: []
};

const defaultFeatureSettings = {
  phone: true,
  billNumber: true,
  adjustments: true,
  settlement: true,
  manualEntries: true,
  coProducts: true,
  creditLedger: true
};

const defaultReceiptSettings = {
  businessTitle: 'JAYE COCO DISTRIBUTION',
  address: 'Simple Billing & Accounting',
  phone1: '077 1234567',
  phone2: '071 9876543',
  phone3: '',
  footerMessage: 'Thank you!'
};

const createLedgerPage = () => ({
  ...initialLedgerState,
  id: createId('ledger'),
  startDate: formatLocalDate(),
  lotName: ''
});

const createHuskLedgerPage = () => ({
  ...initialHuskLedgerState,
  id: createId('husk'),
  startDate: formatLocalDate()
});

const API_STATE_URL = '/api/state';

export default function App() {

  // Language state
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key) => {
    if (!TRANSLATIONS[lang] || !TRANSLATIONS[lang][key]) {
      return TRANSLATIONS['en'][key] || key;
    }
    return TRANSLATIONS[lang][key];
  };

  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true; // Default to dark mode
  });

  // Main ledger states
  const [activeLedger, setActiveLedger] = useState(() => {
    const saved = localStorage.getItem('activeLedger');
    if (saved) {
      return { ...createLedgerPage(), ...JSON.parse(saved) };
    }
    return createLedgerPage();
  });

  // Co-product inputs
  const [coProducts, setCoProducts] = useState(() => {
    const saved = localStorage.getItem('coProducts');
    return saved ? JSON.parse(saved) : { huskType1: '', huskType2: '' };
  });

  // POS Calculator inputs
  const [posBill, setPosBill] = useState(() => createPOSState());
  const [appView, setAppView] = useState('menu');
  const [activeModule, setActiveModule] = useState('coconuts');
  const [showSettings, setShowSettings] = useState(false);
  const [featureSettings, setFeatureSettings] = useState(() => {
    const saved = localStorage.getItem('featureSettings');
    return saved ? { ...defaultFeatureSettings, ...JSON.parse(saved) } : defaultFeatureSettings;
  });
  const [receiptSettings, setReceiptSettings] = useState(() => {
    const saved = localStorage.getItem('receiptSettings');
    return saved ? { ...defaultReceiptSettings, ...JSON.parse(saved) } : defaultReceiptSettings;
  });
  const [huskForm, setHuskForm] = useState(initialHuskState);
  const [activeHuskLedger, setActiveHuskLedger] = useState(() => {
    const saved = localStorage.getItem('activeHuskLedger');
    return saved ? { ...createHuskLedgerPage(), ...JSON.parse(saved) } : createHuskLedgerPage();
  });
  const [archivedHuskLedgers, setArchivedHuskLedgers] = useState(() => {
    const saved = localStorage.getItem('archivedHuskLedgers');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingTxId, setEditingTxId] = useState(null);
  const [editTxForm, setEditTxForm] = useState(null);
  const [archiveAdjustmentDrafts, setArchiveAdjustmentDrafts] = useState({});
  const [mobileCalcField, setMobileCalcField] = useState('qty');

  // Manual entry inputs
  const [manualType, setManualType] = useState('stock'); // stock, expense, income
  const [manualStockQty, setManualStockQty] = useState('');
  const [manualStockLabor, setManualStockLabor] = useState('');
  const [manualDesc, setManualDesc] = useState('');
  const [manualAmount, setManualAmount] = useState('');

  // History state
  const [archivedLedgers, setArchivedLedgers] = useState(() => {
    const saved = localStorage.getItem('archivedLedgers');
    return saved ? JSON.parse(saved) : [];
  });

  // UI state
  const [currentPrintBill, setCurrentPrintBill] = useState(null);
  const [statementPrintType, setStatementPrintType] = useState(null);
  const [showReceiptPreview, setShowReceiptPreview] = useState(false);
  const [receiptPreviewRefocus, setReceiptPreviewRefocus] = useState(false);
  const [showNameSuggestions, setShowNameSuggestions] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [remoteStateLoaded, setRemoteStateLoaded] = useState(false);
  const [remoteStateAvailable, setRemoteStateAvailable] = useState(false);

  // Input Refs for focusing
  const qtyInputRef = useRef(null);
  const priceInputRef = useRef(null);
  const adjustmentInputRef = useRef(null);
  const receiptRef = useRef(null);

  const buildPersistentState = useCallback(() => ({
    activeLedger,
    archivedLedgers,
    coProducts,
    featureSettings,
    receiptSettings,
    activeHuskLedger,
    archivedHuskLedgers,
    darkMode
  }), [
    activeLedger,
    archivedLedgers,
    coProducts,
    featureSettings,
    receiptSettings,
    activeHuskLedger,
    archivedHuskLedgers,
    darkMode
  ]);

  const applyPersistentState = useCallback((state) => {
    if (!state || typeof state !== 'object') return;

    if (state.activeLedger) {
      setActiveLedger({ ...createLedgerPage(), ...state.activeLedger });
    }
    if (state.archivedLedgers) {
      setArchivedLedgers(Array.isArray(state.archivedLedgers) ? state.archivedLedgers : []);
    }
    if (state.coProducts) {
      setCoProducts({ huskType1: '', huskType2: '', ...state.coProducts });
    }
    if (state.featureSettings) {
      setFeatureSettings({ ...defaultFeatureSettings, ...state.featureSettings });
    }
    if (state.receiptSettings) {
      setReceiptSettings({ ...defaultReceiptSettings, ...state.receiptSettings });
    }
    if (state.activeHuskLedger) {
      setActiveHuskLedger({ ...createHuskLedgerPage(), ...state.activeHuskLedger });
    }
    if (state.archivedHuskLedgers) {
      setArchivedHuskLedgers(Array.isArray(state.archivedHuskLedgers) ? state.archivedHuskLedgers : []);
    }
    if (typeof state.darkMode === 'boolean') {
      setDarkMode(state.darkMode);
    }
  }, []);

  useEffect(() => {
    qtyInputRef.current?.focus();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadRemoteState = async () => {
      try {
        const response = await fetch(API_STATE_URL);
        if (!response.ok) {
          throw new Error(`State API returned ${response.status}`);
        }

        const payload = await response.json();
        if (cancelled) return;

        setRemoteStateAvailable(Boolean(payload.database));
        if (payload.state) {
          applyPersistentState(payload.state);
        }
      } catch (error) {
        console.warn('Using local browser storage because database state could not be loaded.', error);
        if (!cancelled) {
          setRemoteStateAvailable(false);
        }
      } finally {
        if (!cancelled) {
          setRemoteStateLoaded(true);
        }
      }
    };

    loadRemoteState();

    return () => {
      cancelled = true;
    };
  }, [applyPersistentState]);

  useEffect(() => {
    if (!remoteStateLoaded || !remoteStateAvailable) return undefined;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      try {
        await fetch(API_STATE_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state: buildPersistentState() }),
          signal: controller.signal
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.warn('Database state save failed. Local browser storage still has the latest state.', error);
        }
      }
    }, 600);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [remoteStateLoaded, remoteStateAvailable, buildPersistentState]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('activeLedger', JSON.stringify(activeLedger));
  }, [activeLedger]);

  useEffect(() => {
    if (activeModule === 'coconuts') {
      setTimeout(() => qtyInputRef.current?.focus(), 50);
    }
  }, [activeModule]);

  useEffect(() => {
    localStorage.setItem('featureSettings', JSON.stringify(featureSettings));
  }, [featureSettings]);

  useEffect(() => {
    localStorage.setItem('receiptSettings', JSON.stringify(receiptSettings));
  }, [receiptSettings]);

  useEffect(() => {
    localStorage.setItem('activeHuskLedger', JSON.stringify(activeHuskLedger));
  }, [activeHuskLedger]);

  useEffect(() => {
    localStorage.setItem('archivedHuskLedgers', JSON.stringify(archivedHuskLedgers));
  }, [archivedHuskLedgers]);

  useEffect(() => {
    localStorage.setItem('coProducts', JSON.stringify(coProducts));
  }, [coProducts]);

  useEffect(() => {
    localStorage.setItem('archivedLedgers', JSON.stringify(archivedLedgers));
  }, [archivedLedgers]);

  // Show inline feedback notification
  const triggerNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const text = (en, si) => (lang === 'si' ? si : en);
  const toAmount = (value) => parseFloat(value) || 0;
  const isBillLike = (tx) => tx.type === 'purchase' || tx.type === 'sale' || tx.type === 'credit_settlement';
  const txAccountType = (tx) => tx.accountType || tx.type;
  const getSettlement = (tx) => parseFloat(tx.settlementAmount) || 0;
  const getCreditDelta = (tx) => {
    if (!tx.name || !isBillLike(tx)) return 0;
    if (typeof tx.creditDelta === 'number') return tx.creditDelta;
    if (tx.type === 'credit_settlement') return -getSettlement(tx);
    if (tx.type === 'purchase' || tx.type === 'sale') return (parseFloat(tx.netAmount) || 0) - getSettlement(tx);
    return 0;
  };

  const calculateLedgerFinancials = (ledger, ledgerCoProducts = coProducts) => {
    const transactions = ledger.transactions || [];
    const delayed = ledger.delayedAdjustments || [];
    const delayedIncome = delayed
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const delayedExpense = delayed
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

    const purchasedCoconuts = transactions
      .filter(tx => tx.type === 'purchase')
      .reduce((sum, tx) => sum + (parseFloat(tx.qty) || 0), 0);
    const soldCoconuts = transactions
      .filter(tx => tx.type === 'sale')
      .reduce((sum, tx) => sum + (parseFloat(tx.qty) || 0), 0);
    const purchaseAmount = transactions
      .filter(tx => tx.type === 'purchase')
      .reduce((sum, tx) => sum + (parseFloat(tx.netAmount) || 0), 0);
    const saleAmount = transactions
      .filter(tx => tx.type === 'sale')
      .reduce((sum, tx) => sum + (parseFloat(tx.netAmount) || 0), 0);
    const manualIncome = transactions
      .filter(tx => tx.type === 'manual_income')
      .reduce((sum, tx) => sum + (parseFloat(tx.netAmount) || 0), 0);
    const huskingLabor = transactions
      .filter(tx => tx.category === 'husking_labor' || String(tx.id || '').endsWith('_labor'))
      .reduce((sum, tx) => sum + (parseFloat(tx.netAmount) || 0), 0);
    const totalExpensesBase = transactions
      .filter(tx => tx.type === 'purchase' || tx.type === 'daily_cost')
      .reduce((sum, tx) => sum + (parseFloat(tx.netAmount) || 0), 0);
    const manualAndSalesIncome = saleAmount + manualIncome;
    const coProductIncome = (parseFloat(ledgerCoProducts?.huskType1) || 0) + (parseFloat(ledgerCoProducts?.huskType2) || 0);
    const totalExpenses = totalExpensesBase + delayedExpense;
    const totalIncome = manualAndSalesIncome + coProductIncome + delayedIncome;

    return {
      totalExpenses,
      totalIncome,
      coProductIncome,
      netProfit: totalIncome - totalExpenses,
      purchasedCoconuts,
      purchaseAmount,
      soldCoconuts,
      saleAmount,
      huskedCoconuts: ledger.huskedCoconutsCount || 0,
      huskingLabor,
      totalManualIncome: manualIncome,
      totalOtherCosts: Math.max(0, totalExpensesBase - purchaseAmount - huskingLabor),
      delayedIncome,
      delayedExpense,
      manualAndSalesIncome
    };
  };

  const calculateHuskFinancials = (ledger) => {
    const records = ledger.records || [];
    const totalHusks = records.reduce((sum, record) => sum + (parseFloat(record.qty) || 0), 0);
    const totalExpense = records.reduce((sum, record) => sum + (parseFloat(record.totalExpense) || 0), 0);
    const totalWeight = records.reduce((sum, record) => sum + (parseFloat(record.weight1000) || 0), 0);
    const weightEntries = records.filter(record => parseFloat(record.weight1000) > 0).length;

    return {
      totalHusks,
      totalExpense,
      averageWeight1000: weightEntries ? totalWeight / weightEntries : 0
    };
  };

  // Keyboard listeners for POS fields
  const handlePOSKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handlePrintAndCommit();
    }
  };

  // Calculations for POS Calculator
  const posQty = parseFloat(posBill.qty) || 0;
  const posPrice = parseFloat(posBill.price) || 0;
  const posGross = posQty * posPrice;
  const hasPosAdjustment = featureSettings.adjustments && String(posBill.adjustment ?? '').trim() !== '';
  const parsedPosAdjustment = parseFloat(posBill.adjustment);
  const posAdjustment = hasPosAdjustment && Number.isFinite(parsedPosAdjustment) ? parsedPosAdjustment : 0;
  const posSettlement = featureSettings.settlement ? parseFloat(posBill.settlement) || 0 : 0;
  const currentPosItemPreset = getPosItemPreset(posBill.itemType);
  const isCoconutCalculator = currentPosItemPreset.itemType === 'coconut';
  const posQtyLabel = isCoconutCalculator ? text('Coconut Quantity', 'පොල් ගෙඩි ගණන') : text('Husk Quantity', 'ලෙලි ප්‍රමාණය');
  const posPriceLabel = isCoconutCalculator ? text('Price per Coconut (Rs.)', 'පොල් ගෙඩියක මිල (රු.)') : text('Price per kg (Rs.)', 'කිලෝවක මිල (රු.)');
  const posItemDescription = posBill.itemDescription ? posBill.itemDescription.trim() : currentPosItemPreset.itemDescription;
  const posItemUnit = posBill.itemUnit || currentPosItemPreset.itemUnit;
  
  let posNet = posGross;
  if (hasPosAdjustment) {
    posNet = posBill.balanceType === 'add' 
      ? posGross + posAdjustment 
      : posGross - posAdjustment;
  }

  const isPaymentOnly = (!posBill.qty || posQty === 0) && posBill.name && posSettlement > 0;
  const mobileFieldLabels = {
    qty: isCoconutCalculator ? text('Coco', 'පොල්') : text('Husk', 'ලෙලි'),
    price: text('Price', 'මිල'),
    adjustment: text('Adj', 'ගැලපුම්'),
    settlement: text('Debt', 'ණය')
  };
  const mobileCalcFields = [
    'qty',
    'price',
    ...(featureSettings.adjustments ? ['adjustment'] : []),
    ...(featureSettings.settlement ? ['settlement'] : [])
  ];
  const activeMobileCalcField = mobileCalcFields.includes(mobileCalcField) ? mobileCalcField : 'qty';
  const mobileDisplayRaw = posBill[activeMobileCalcField] || '';
  const mobileDisplayValue = mobileDisplayRaw || '0';

  const updateMobileCalcField = (field, value) => {
    setPosBill(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const switchPOSItemType = (itemType) => {
    const preset = getPosItemPreset(itemType);
    setPosBill(prev => ({
      ...prev,
      ...preset
    }));
    setMobileCalcField('qty');
  };

  const handleMobileNumberKey = (key) => {
    const current = String(posBill[activeMobileCalcField] || '');
    if (key === '.' && current.includes('.')) return;

    const next = key === '.'
      ? (current ? `${current}.` : '0.')
      : current === '0'
        ? key
        : `${current}${key}`;

    updateMobileCalcField(activeMobileCalcField, next);
  };

  const handleMobileBackspace = () => {
    const current = String(posBill[activeMobileCalcField] || '');
    updateMobileCalcField(activeMobileCalcField, current.slice(0, -1));
  };

  const handleMobileClearField = () => {
    updateMobileCalcField(activeMobileCalcField, '');
  };

  const handleMobileClearAll = () => {
    setPosBill(createPOSState(posBill.type, currentPosItemPreset.itemType));
    setMobileCalcField('qty');
  };

  const handleMobilePercent = () => {
    const value = parseFloat(posBill[activeMobileCalcField]);
    if (!Number.isFinite(value)) return;
    updateMobileCalcField(activeMobileCalcField, String(value / 100));
  };

  const handleMobileNextField = () => {
    const currentIndex = mobileCalcFields.indexOf(activeMobileCalcField);
    const nextField = mobileCalcFields[(currentIndex + 1) % mobileCalcFields.length] || 'qty';
    setMobileCalcField(nextField);
  };

  // Get outstanding balance for a customer/supplier name
  const getCustomerOutstanding = (name, type) => {
    if (!name) return 0;
    const targetName = name.trim().toLowerCase();
    const transactions = [
      ...(activeLedger.transactions || []),
      ...archivedLedgers.flatMap(l => l.transactions || [])
    ];

    return transactions
      .filter(tx => tx.name && tx.name.trim().toLowerCase() === targetName && txAccountType(tx) === type)
      .reduce((sum, tx) => sum + getCreditDelta(tx), 0);
  };

  // Get unique names of customer/supplier for autocomplete dropdown suggestions
  const getUniqueNames = (type) => {
    const names = new Set();
    activeLedger.transactions.forEach(t => {
      if (t.name && txAccountType(t) === type) names.add(t.name.trim());
    });
    archivedLedgers.forEach(l => {
      (l.transactions || []).forEach(t => {
        if (t.name && txAccountType(t) === type) names.add(t.name.trim());
      });
    });
    return Array.from(names);
  };

  const outstanding = getCustomerOutstanding(posBill.name, posBill.type);
  const remainingOutstanding = posBill.name ? outstanding + (isPaymentOnly ? 0 : posNet) - posSettlement : 0;

  const partyBalances = getUniqueNames('sale').map(name => ({
    name,
    type: 'sale',
    amount: getCustomerOutstanding(name, 'sale')
  })).concat(getUniqueNames('purchase').map(name => ({
    name,
    type: 'purchase',
    amount: getCustomerOutstanding(name, 'purchase')
  }))).filter(item => Math.abs(item.amount) > 0.009);

  const nameQuery = posBill.name.trim().toLowerCase();
  const nameSuggestions = getUniqueNames(posBill.type)
    .filter(name => {
      const normalizedName = name.toLowerCase();
      return nameQuery && normalizedName.includes(nameQuery) && normalizedName !== nameQuery;
    })
    .slice(0, 6);

  const selectNameSuggestion = (name) => {
    setPosBill(prev => ({ ...prev, name }));
    setShowNameSuggestions(false);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter' && showNameSuggestions && nameSuggestions.length > 0) {
      e.preventDefault();
      selectNameSuggestion(nameSuggestions[0]);
      return;
    }
    handlePOSKeyDown(e);
  };

  const renderNameSuggestions = () => {
    if (!showNameSuggestions || nameSuggestions.length === 0) return null;

    return (
      <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-44 overflow-y-auto rounded-lg border border-slate-200 bg-white text-slate-900 shadow-xl">
        {nameSuggestions.map(name => (
          <button
            key={name}
            type="button"
            onPointerDown={(e) => {
              e.preventDefault();
              selectNameSuggestion(name);
            }}
            className="flex w-full items-center justify-between gap-3 border-b border-slate-100 px-3 py-2 text-left text-sm font-black last:border-b-0 active:bg-emerald-50"
          >
            <span className="min-w-0 truncate">{name}</span>
            <span className="shrink-0 text-[11px] font-bold text-slate-500">
              {formatCurrency(getCustomerOutstanding(name, posBill.type))}
            </span>
          </button>
        ))}
      </div>
    );
  };

  const receiptBusinessTitle = String(receiptSettings.businessTitle || defaultReceiptSettings.businessTitle).trim();
  const receiptAddress = String(receiptSettings.address || '').trim();
  const receiptPhones = [receiptSettings.phone1, receiptSettings.phone2, receiptSettings.phone3]
    .map(phone => String(phone || '').trim())
    .filter(Boolean)
    .slice(0, 3);
  const receiptFooterMessage = String(receiptSettings.footerMessage || '').trim();

  const setReceiptPageSize = () => {
    const receipt = receiptRef.current;
    if (!receipt) return;

    receipt.classList.add('receipt-measuring');
    const pxPerMm = 96 / 25.4;
    const measuredHeightMm = Math.ceil(receipt.scrollHeight / pxPerMm);
    receipt.classList.remove('receipt-measuring');

    const pageHeightMm = Math.max(90, measuredHeightMm + 8);
    let styleTag = document.getElementById('receipt-page-size');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'receipt-page-size';
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = `@media print { @page { margin: 0; size: 80mm ${pageHeightMm}mm; } }`;
  };

  const shouldUseReceiptPrintPage = () => {
    if (typeof window === 'undefined') return false;

    return window.matchMedia('(max-width: 767px)').matches
      || /Android|iPhone|iPad|iPod|Mobile/i.test(window.navigator.userAgent);
  };

  const openReceiptPrintPage = (asPdf = false) => {
    const receipt = receiptRef.current;
    if (!receipt || !currentPrintBill) return false;

    setReceiptPageSize();
    const receiptTitle = asPdf
      ? `receipt-${currentPrintBill.billNumber || currentPrintBill.id || Date.now()}`
      : 'Receipt';
    const printWindow = window.open('', '_blank', 'width=420,height=720');
    if (!printWindow) return false;

    printWindow.opener = null;
    printWindow.document.open();
    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${receiptTitle}</title>
          <style>
            @page { margin: 0; size: 80mm auto; }
            * { box-sizing: border-box; }
            html, body {
              margin: 0;
              min-height: 100%;
              background: #e2e8f0;
              color: #000;
              font-family: "Courier New", Courier, monospace;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .toolbar {
              position: sticky;
              top: 0;
              z-index: 10;
              display: flex;
              gap: 8px;
              justify-content: center;
              padding: 12px;
              background: #0f172a;
            }
            .toolbar button {
              min-height: 44px;
              border: 0;
              border-radius: 8px;
              padding: 0 16px;
              background: #047857;
              color: #fff;
              font: 800 14px Arial, sans-serif;
            }
            .toolbar .close {
              background: rgba(255, 255, 255, 0.14);
            }
            .receipt-shell {
              width: 80mm;
              margin: 0 auto;
              padding: 4mm;
              background: #fff;
            }
            .receipt-page {
              width: 72mm;
              max-width: 72mm;
              margin: 0 auto;
              padding: 3mm 0 5mm;
              background: #fff;
              color: #000;
              font-family: "Courier New", Courier, monospace;
              font-size: 10px;
              font-weight: 400;
              line-height: 1.25;
              letter-spacing: 0;
            }
            .receipt-page * {
              color: #000 !important;
              background: transparent !important;
              box-shadow: none !important;
              text-shadow: none !important;
              letter-spacing: 0 !important;
              line-height: inherit !important;
            }
            .receipt-page h2 {
              margin: 0 !important;
              font-size: 15px !important;
              line-height: 1.15 !important;
              overflow-wrap: anywhere !important;
            }
            .receipt-page h3 {
              margin: 0 !important;
              font-size: 10px !important;
              line-height: 1.2 !important;
            }
            .receipt-page p { margin: 0 !important; }
            .receipt-page .mb-6 { margin-bottom: 4mm !important; }
            .receipt-page .my-2 {
              margin-top: 2mm !important;
              margin-bottom: 2mm !important;
            }
            .receipt-page .my-3,
            .receipt-page .my-4 {
              margin-top: 3mm !important;
              margin-bottom: 3mm !important;
            }
            .receipt-page .mt-6 { margin-top: 4mm !important; }
            .receipt-page .space-y-1 > :not([hidden]) ~ :not([hidden]) {
              margin-top: 1.1mm !important;
            }
            .receipt-page .flex.justify-between {
              display: grid !important;
              grid-template-columns: minmax(0, 1fr) max-content;
              column-gap: 2mm;
              align-items: start !important;
              width: 100% !important;
              break-inside: avoid !important;
            }
            .receipt-page .flex.justify-between > :first-child {
              min-width: 0 !important;
              overflow-wrap: anywhere !important;
              word-break: normal !important;
            }
            .receipt-page .flex.justify-between > :last-child {
              min-width: 0 !important;
              max-width: 34mm !important;
              text-align: right !important;
              white-space: nowrap !important;
              overflow-wrap: normal !important;
            }
            .receipt-page .font-bold,
            .receipt-page .font-semibold,
            .receipt-page .font-black {
              font-weight: 700 !important;
            }
            .receipt-page .text-xs,
            .receipt-page .text-\\[11px\\],
            .receipt-page .text-\\[10px\\] {
              font-size: 10px !important;
            }
            .receipt-page .receipt-business-title {
              font-size: 15px !important;
              line-height: 1.15 !important;
              overflow-wrap: anywhere !important;
            }
            .receipt-page .receipt-business-line {
              font-size: 11px !important;
              line-height: 1.25 !important;
              font-weight: 700 !important;
              overflow-wrap: anywhere !important;
            }
            .receipt-page .receipt-item-row {
              break-inside: avoid !important;
            }
            .receipt-page .receipt-item-name,
            .receipt-page .receipt-item-meta {
              font-size: 13px !important;
              line-height: 1.25 !important;
            }
            .receipt-page .receipt-net-total.flex.justify-between {
              grid-template-columns: minmax(0, 1fr) max-content !important;
              column-gap: 1.5mm !important;
              align-items: center !important;
              padding: 2mm 0 !important;
              border-top: 2px solid #000 !important;
              border-bottom: 2px solid #000 !important;
              font-size: 15px !important;
              line-height: 1.2 !important;
            }
            .receipt-page .receipt-net-total.flex.justify-between > :last-child {
              max-width: none !important;
              font-size: 20px !important;
              font-weight: 900 !important;
            }
            .receipt-page .receipt-footer {
              font-size: 12px !important;
              line-height: 1.25 !important;
              font-weight: 700 !important;
              overflow-wrap: anywhere !important;
            }
            .receipt-page .border-b { border-bottom: 1px solid #000 !important; }
            .receipt-page .border-dashed { border-style: dashed !important; }
            .receipt-page .text-center { text-align: center !important; }
            .receipt-page .uppercase { text-transform: uppercase !important; }
            @media print {
              html, body {
                width: 80mm;
                min-width: 80mm;
                max-width: 80mm;
                background: #fff;
              }
              .toolbar { display: none !important; }
              .receipt-shell {
                width: 80mm;
                margin: 0;
                padding: 0 4mm;
                background: #fff;
              }
            }
          </style>
        </head>
        <body>
          <div class="toolbar">
            <button type="button" onclick="window.print()">Print / Save PDF</button>
            <button type="button" class="close" onclick="window.close()">Close</button>
          </div>
          <main class="receipt-shell">
            <div class="receipt-page">${receipt.innerHTML}</div>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    return true;
  };

  const printReceipt = (bill, shouldRefocus = false) => {
    setCurrentPrintBill(bill);
    setReceiptPreviewRefocus(shouldRefocus);
    setShowReceiptPreview(true);
  };

  const handleReceiptOutput = (asPdf = false) => {
    if (!currentPrintBill) return;

    if (shouldUseReceiptPrintPage() && openReceiptPrintPage(asPdf)) {
      setShowReceiptPreview(false);
      if (receiptPreviewRefocus) qtyInputRef.current?.focus();
      return;
    }

    const originalTitle = document.title;
    if (asPdf) {
      document.title = `receipt-${currentPrintBill.billNumber || currentPrintBill.id || Date.now()}`;
    }

    const cleanupAfterPrint = () => {
      setShowReceiptPreview(false);
      if (receiptPreviewRefocus) qtyInputRef.current?.focus();
      if (asPdf) {
        document.title = originalTitle;
      }
    };

    window.addEventListener('afterprint', cleanupAfterPrint, { once: true });
    setReceiptPageSize();
    window.print();
  };

  const closeReceiptPreview = () => {
    setShowReceiptPreview(false);
    if (receiptPreviewRefocus) qtyInputRef.current?.focus();
  };

  // Handle Print and Commit of POS Bill
  const handlePrintAndCommit = () => {
    const isPayment = isPaymentOnly;

    if (!isPayment) {
      if (!posBill.qty || posQty <= 0) {
        triggerNotification(t('errQty'), 'error');
        qtyInputRef.current?.focus();
        return;
      }
      if (!posBill.price || posPrice <= 0) {
        triggerNotification(t('errPrice'), 'error');
        priceInputRef.current?.focus();
        return;
      }
    } else {
      if (!posSettlement || posSettlement <= 0) {
        triggerNotification(t('errExpenseAmt'), 'error');
        adjustmentInputRef.current?.focus();
        return;
      }
    }

    const transactionId = createId('tx');
    const newTransaction = {
      id: transactionId,
      time: formatLocalTime(),
      date: posBill.date || formatLocalDate(),
      type: isPayment ? 'credit_settlement' : posBill.type,
      accountType: posBill.type,
      itemType: currentPosItemPreset.itemType,
      itemDescription: posItemDescription,
      itemUnit: posItemUnit,
      qty: isPayment ? 0 : posQty,
      price: isPayment ? 0 : posPrice,
      adjustment: posAdjustment,
      adjustmentType: featureSettings.adjustments ? posBill.balanceType : 'none',
      netAmount: isPayment ? 0 : posNet,
      settlementAmount: posSettlement,
      creditDelta: isPayment ? -posSettlement : posNet - posSettlement,
      committed: true,
      name: posBill.name ? posBill.name.trim() : '',
      phone: featureSettings.phone && posBill.phone ? posBill.phone.trim() : '',
      billNumber: featureSettings.billNumber && posBill.billNumber ? posBill.billNumber.trim() : '',
      description: isPayment 
        ? (posBill.type === 'purchase' ? t('paymentMade') : t('paymentReceived'))
        : (posBill.type === 'purchase'
            ? `${posItemDescription} - ${t('supplierSupply')}${posBill.billNumber ? ` (${posBill.billNumber})` : ''}`
            : `${posItemDescription} - ${t('customerPurchase')}${posBill.billNumber ? ` (${posBill.billNumber})` : ''}`)
    };

    // Update active ledger
    setActiveLedger(prev => ({
      ...prev,
      transactions: [...prev.transactions, newTransaction]
    }));

    // Clear and Refocus
    setPosBill(createPOSState(posBill.type, currentPosItemPreset.itemType));
    triggerNotification(t('successBill'));
    
    // Set timeout to let state update, then print, then refocus
    printReceipt(newTransaction, true);
  };

  // Handle Manual Entries (Husked stocks / Daily costs)
  const handleAddManualEntry = (e) => {
    e.preventDefault();

    if (manualType === 'stock') {
      const qty = parseInt(manualStockQty) || 0;
      const laborCostPerPiece = parseFloat(manualStockLabor) || 0;
      
      if (qty <= 0) {
        triggerNotification(t('errQty'), 'error');
        return;
      }

      const transactionId = createId('tx');
      const transactionsToAdd = [];

      // Add Stock Log
      transactionsToAdd.push({
        id: transactionId,
        time: formatLocalTime(),
        date: formatLocalDate(),
        type: 'stock_log',
        qty: qty,
        price: 0,
        adjustment: 0,
        adjustmentType: 'none',
        netAmount: 0,
        description: t('huskedCoconutsDesc')
      });

      // Add Labor Cost if entered
      if (laborCostPerPiece > 0) {
        const totalLaborCost = qty * laborCostPerPiece;
        transactionsToAdd.push({
          id: transactionId + '_labor',
          time: formatLocalTime(),
          date: formatLocalDate(),
          type: 'daily_cost',
          category: 'husking_labor',
          qty: qty,
          price: laborCostPerPiece,
          adjustment: 0,
          adjustmentType: 'none',
          netAmount: totalLaborCost,
          description: `${t('peelingLabor')} - Qty: ${qty} @ ${formatCurrency(laborCostPerPiece)}`
        });
      }

      setActiveLedger(prev => ({
        ...prev,
        huskedCoconutsCount: prev.huskedCoconutsCount + qty,
        transactions: [...prev.transactions, ...transactionsToAdd]
      }));

      setManualStockQty('');
      setManualStockLabor('');
      triggerNotification(t('successHusk'));

    } else if (manualType === 'expense') {
      const amount = parseFloat(manualAmount) || 0;
      if (!manualDesc) {
        triggerNotification(t('errExpenseDesc'), 'error');
        return;
      }
      if (amount <= 0) {
        triggerNotification(t('errExpenseAmt'), 'error');
        return;
      }

      const newTransaction = {
        id: createId('tx'),
        time: formatLocalTime(),
        date: formatLocalDate(),
        type: 'daily_cost',
        qty: 0,
        price: 0,
        adjustment: 0,
        adjustmentType: 'none',
        netAmount: amount,
        description: `${manualDesc} (${t('dailyCostDesc')})`
      };

      setActiveLedger(prev => ({
        ...prev,
        transactions: [...prev.transactions, newTransaction]
      }));

      setManualDesc('');
      setManualAmount('');
      triggerNotification(t('successExpense'));

    } else if (manualType === 'income') {
      const amount = parseFloat(manualAmount) || 0;
      if (!manualDesc) {
        triggerNotification(t('errIncomeDesc'), 'error');
        return;
      }
      if (amount <= 0) {
        triggerNotification(t('errIncomeAmt'), 'error');
        return;
      }

      const newTransaction = {
        id: createId('tx'),
        time: formatLocalTime(),
        date: formatLocalDate(),
        type: 'manual_income',
        qty: 0,
        price: 0,
        adjustment: 0,
        adjustmentType: 'none',
        netAmount: amount,
        description: `${manualDesc} (${t('manualIncomeDesc')})`
      };

      setActiveLedger(prev => ({
        ...prev,
        transactions: [...prev.transactions, newTransaction]
      }));

      setManualDesc('');
      setManualAmount('');
      triggerNotification(t('successIncome'));
    }
  };

  // Delete transaction from active ledger
  const handleDeleteTransaction = (id, type, qty) => {
    setActiveLedger(prev => {
      let huskedDecrease = 0;
      if (type === 'stock_log') {
        huskedDecrease = qty;
      }
      return {
        ...prev,
        huskedCoconutsCount: Math.max(0, prev.huskedCoconutsCount - huskedDecrease),
        transactions: prev.transactions.filter(t => t.id !== id)
      };
    });
    triggerNotification(t('successRemove'), 'info');
  };

  // Running calculations for the Ledger Book & Profit/Loss Section
  const activeFinancials = calculateLedgerFinancials(activeLedger, featureSettings.coProducts ? coProducts : {});
  const {
    totalExpenses,
    totalIncome: finalTotalIncome,
    coProductIncome: totalCoProductIncome,
    netProfit,
    purchasedCoconuts: totalPurchasedCoconuts,
    purchaseAmount: totalPurchaseAmount,
    soldCoconuts: totalSoldCoconuts,
    saleAmount: totalSaleAmount,
    huskingLabor: totalHuskingLabor,
    totalManualIncome,
    totalOtherCosts,
    manualAndSalesIncome
  } = activeFinancials;

  const huskSubtotal = toAmount(huskForm.qty) * toAmount(huskForm.haulingRate);
  const huskTotalExpense = huskSubtotal + toAmount(huskForm.cuttingWages) + toAmount(huskForm.dryingWages);
  const huskAverageWeight = toAmount(huskForm.weight1000) > 0 ? toAmount(huskForm.weight1000) / 1000 : 0;
  const activeHuskFinancials = calculateHuskFinancials(activeHuskLedger);
  const allLedgerTransactions = [
    ...(activeLedger.transactions || []),
    ...archivedLedgers.flatMap(ledger => ledger.transactions || [])
  ];
  const inventoryRows = Object.values(allLedgerTransactions
    .filter(tx => tx.type === 'purchase' || tx.type === 'sale')
    .reduce((items, tx) => {
      const txPreset = getPosItemPreset(tx.itemType);
      const itemName = tx.itemDescription || txPreset.itemDescription;
      const itemUnit = tx.itemUnit || txPreset.itemUnit;
      const itemKey = `${itemName}__${itemUnit}`;
      if (!items[itemKey]) {
        items[itemKey] = {
          itemName,
          itemUnit,
          purchasedQty: 0,
          soldQty: 0,
          purchaseValue: 0,
          saleValue: 0
        };
      }

      const qty = toAmount(tx.qty);
      const lineValue = qty * toAmount(tx.price);
      if (tx.type === 'purchase') {
        items[itemKey].purchasedQty += qty;
        items[itemKey].purchaseValue += lineValue;
      } else {
        items[itemKey].soldQty += qty;
        items[itemKey].saleValue += lineValue;
      }
      return items;
    }, {}))
    .map(item => {
      const avgBuy = item.purchasedQty > 0 ? item.purchaseValue / item.purchasedQty : 0;
      const avgSell = item.soldQty > 0 ? item.saleValue / item.soldQty : 0;
      const stockQty = item.purchasedQty - item.soldQty;
      return {
        ...item,
        avgBuy,
        avgSell,
        stockQty,
        stockValue: stockQty * avgBuy,
        profit: item.saleValue - (item.soldQty * avgBuy)
      };
    });
  const stockValueTotal = inventoryRows.reduce((sum, item) => sum + item.stockValue, 0);
  const inventoryProfitTotal = inventoryRows.reduce((sum, item) => sum + item.profit, 0);

  // Archive / Close Ledger Page
  const handleArchiveLedger = () => {
    const closedLedger = {
      ...activeLedger,
      endDate: formatLocalDate(),
      endTime: formatLocalTime(),
      coProducts: featureSettings.coProducts ? { ...coProducts } : {},
      delayedAdjustments: activeLedger.delayedAdjustments || [],
      financials: activeFinancials
    };

    // Save to history and reset active
    setArchivedLedgers(prev => [closedLedger, ...prev]);
    
    setActiveLedger(createLedgerPage());
    setCoProducts({ huskType1: '', huskType2: '' });
    setShowResetConfirm(false);
    triggerNotification(t('successArchive'));
  };

  const startEditTransaction = (tx) => {
    setEditingTxId(tx.id);
    setEditTxForm({
      type: txAccountType(tx) === 'purchase' ? 'purchase' : 'sale',
      qty: tx.qty || '',
      price: tx.price || '',
      adjustment: tx.adjustment || '',
      adjustmentType: tx.adjustmentType || 'subtract',
      settlementAmount: tx.settlementAmount || '',
      name: tx.name || '',
      phone: tx.phone || '',
      billNumber: tx.billNumber || '',
      description: tx.description || ''
    });
  };

  const handleSaveEditedTransaction = (e) => {
    e.preventDefault();
    if (!editTxForm || !editingTxId) return;

    setActiveLedger(prev => ({
      ...prev,
      transactions: prev.transactions.map(tx => {
        if (tx.id !== editingTxId) return tx;

        const qty = toAmount(editTxForm.qty);
        const price = toAmount(editTxForm.price);
        const adjustment = featureSettings.adjustments ? toAmount(editTxForm.adjustment) : 0;
        const settlementAmount = featureSettings.settlement ? toAmount(editTxForm.settlementAmount) : 0;
        const isPayment = tx.type === 'credit_settlement' || qty <= 0;
        const gross = qty * price;
        const netAmount = isPayment
          ? 0
          : editTxForm.adjustmentType === 'add'
            ? gross + adjustment
            : gross - adjustment;

        return {
          ...tx,
          type: isPayment ? 'credit_settlement' : editTxForm.type,
          accountType: editTxForm.type,
          qty: isPayment ? 0 : qty,
          price: isPayment ? 0 : price,
          adjustment,
          adjustmentType: featureSettings.adjustments ? editTxForm.adjustmentType : 'none',
          settlementAmount,
          netAmount,
          creditDelta: isPayment ? -settlementAmount : netAmount - settlementAmount,
          name: editTxForm.name.trim(),
          phone: featureSettings.phone ? editTxForm.phone.trim() : '',
          billNumber: featureSettings.billNumber ? editTxForm.billNumber.trim() : '',
          description: editTxForm.description.trim() || tx.description
        };
      })
    }));

    setEditingTxId(null);
    setEditTxForm(null);
    triggerNotification(text('Bill updated', 'බිල යාවත්කාලීන කළා'), 'info');
  };

  const handleSaveHuskRecord = (e) => {
    e.preventDefault();
    const qty = toAmount(huskForm.qty);
    if (qty <= 0) {
      triggerNotification(text('Enter husk quantity', 'ලෙලි ගණන ඇතුළත් කරන්න'), 'error');
      return;
    }

    const record = {
      id: createId('husk_tx'),
      date: formatLocalDate(),
      time: formatLocalTime(),
      qty,
      haulingRate: toAmount(huskForm.haulingRate),
      transportSubtotal: huskSubtotal,
      cuttingWages: toAmount(huskForm.cuttingWages),
      dryingWages: toAmount(huskForm.dryingWages),
      totalExpense: huskTotalExpense,
      weight1000: toAmount(huskForm.weight1000),
      averageWeight: huskAverageWeight
    };

    setActiveHuskLedger(prev => ({
      ...prev,
      records: [record, ...(prev.records || [])]
    }));
    setHuskForm(initialHuskState);
    triggerNotification(text('Husk lot saved', 'ලෙලි සටහන සුරැකුණා'));
  };

  const handleArchiveHuskLedger = () => {
    if ((activeHuskLedger.records || []).length === 0) {
      triggerNotification(text('No husk records to close', 'වසා දැමීමට ලෙලි සටහන් නැත'), 'error');
      return;
    }

    const closedHuskLedger = {
      ...activeHuskLedger,
      endDate: formatLocalDate(),
      endTime: formatLocalTime(),
      financials: calculateHuskFinancials(activeHuskLedger)
    };

    setArchivedHuskLedgers(prev => [closedHuskLedger, ...prev]);
    setActiveHuskLedger(createHuskLedgerPage());
    triggerNotification(text('Husk lot closed', 'ලෙලි පිටුව වසා දැමුණා'));
  };

  const handleArchivedAdjustmentChange = (ledgerId, field, value) => {
    setArchiveAdjustmentDrafts(prev => ({
      ...prev,
      [ledgerId]: {
        type: 'income',
        description: '',
        amount: '',
        ...(prev[ledgerId] || {}),
        [field]: value
      }
    }));
  };

  const handleAddArchivedAdjustment = (ledgerId) => {
    const draft = archiveAdjustmentDrafts[ledgerId] || {};
    const amount = toAmount(draft.amount);
    if (amount <= 0) {
      triggerNotification(text('Enter amount', 'මුදල ඇතුළත් කරන්න'), 'error');
      return;
    }

    const adjustment = {
      id: createId('delay'),
      date: formatLocalDate(),
      time: formatLocalTime(),
      type: draft.type || 'income',
      description: draft.description || text('Delayed adjustment', 'ප්‍රමාද සටහන'),
      amount
    };

    setArchivedLedgers(prev => prev.map(ledger => {
      if (ledger.id !== ledgerId) return ledger;
      const updated = {
        ...ledger,
        delayedAdjustments: [adjustment, ...(ledger.delayedAdjustments || [])]
      };
      return {
        ...updated,
        financials: calculateLedgerFinancials(updated, updated.coProducts || {})
      };
    }));

    setArchiveAdjustmentDrafts(prev => ({
      ...prev,
      [ledgerId]: { type: 'income', description: '', amount: '' }
    }));
    triggerNotification(text('Archived lot updated', 'පරණ පිටුව යාවත්කාලීන කළා'), 'info');
  };

  // Clear entire history
  const handleClearHistory = () => {
    if (window.confirm(t('confirmClearHistory'))) {
      setArchivedLedgers([]);
      triggerNotification(t('successClearHistory'), 'info');
    }
  };

  const openAppView = (view) => {
    setAppView(view);
    if (view === 'sales') {
      setActiveModule('coconuts');
    }
    if (view === 'settings') {
      setShowSettings(true);
    }
  };

  const printStatement = () => {
    flushSync(() => {
      setStatementPrintType(appView);
    });

    const cleanupAfterPrint = () => {
      setStatementPrintType(null);
    };

    window.addEventListener('afterprint', cleanupAfterPrint, { once: true });
    window.print();
  };

  const renderTopNav = (title = 'Menu') => (
    <div className="mb-4 flex items-center justify-between rounded-2xl bg-gradient-to-r from-violet-900 via-purple-800 to-fuchsia-800 px-4 py-4 text-white shadow-xl shadow-purple-950/20 md:hidden">
      <button
        type="button"
        onClick={() => openAppView('menu')}
        className="flex items-center gap-2 text-left active:scale-95"
      >
        <ShoppingCart className="h-6 w-6" />
        <span className="text-2xl font-black leading-none">{title}</span>
      </button>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => triggerNotification(text('Search uses saved names in Sales', 'Sales තුළ සුරකින නම් සොයන්න'), 'info')}
          className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15 active:scale-95"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => openAppView('menu')}
          className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15 active:scale-95"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  const renderMenuView = () => {
    const menuItems = [
      { id: 'sales', label: 'SALES', icon: ShoppingCart },
      { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
      { id: 'summary', label: 'SUMMARY', icon: ClipboardList },
      { id: 'settings', label: 'SETTINGS', icon: Settings },
      { id: 'help', label: 'HELP', icon: HelpCircle },
      { id: 'about', label: 'ABOUT', icon: Info }
    ];

    return (
      <section className="shopbook-menu min-h-[calc(100svh-2rem)] rounded-3xl bg-[#241b35] p-4 text-white shadow-2xl md:min-h-0">
        {renderTopNav('Menu')}
        <div className="mb-5 hidden items-center justify-between md:flex">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-violet-200" />
            <h2 className="text-3xl font-black">Menu</h2>
          </div>
          <div className="flex gap-2">
            <Search className="h-6 w-6 text-violet-100" />
            <X className="h-6 w-6 text-violet-100" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => openAppView(id)}
              className="flex aspect-square flex-col items-center justify-center gap-4 rounded-2xl bg-[#171020] text-white ring-1 ring-white/10 shadow-lg transition active:scale-95"
            >
              <Icon className="h-12 w-12 stroke-[1.8]" />
              <span className="text-sm font-black tracking-wide">{label}</span>
            </button>
          ))}
        </div>
      </section>
    );
  };

  const renderDashboardView = () => (
    <section className="space-y-4">
      {renderTopNav('Dashboard')}
      <div className={`rounded-2xl p-5 text-white shadow-xl ${netProfit >= 0 ? 'bg-gradient-to-br from-emerald-700 to-slate-950' : 'bg-gradient-to-br from-rose-700 to-slate-950'}`}>
        <span className="text-[11px] font-black uppercase tracking-widest opacity-80">Profit Statement</span>
        <div className="mt-3 text-4xl font-black">{formatCurrency(netProfit)}</div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-bold">
          <div className="rounded-xl bg-white/10 p-3">
            <span className="block opacity-70">Sales</span>
            <span className="mt-1 block text-lg">{formatCurrency(finalTotalIncome)}</span>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <span className="block opacity-70">Costs</span>
            <span className="mt-1 block text-lg">{formatCurrency(totalExpenses)}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          [text('Purchased', 'මිලදී ගත්'), totalPurchasedCoconuts.toLocaleString()],
          [text('Sold', 'විකුණූ'), totalSoldCoconuts.toLocaleString()],
          [text('Stock Value', 'ස්ටොක් අගය'), formatCurrency(stockValueTotal)],
          [text('Item Profit', 'අයිතම ලාභය'), formatCurrency(inventoryProfitTotal)]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</span>
            <span className="mt-2 block text-xl font-black">{value}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={printStatement}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-700 px-4 py-4 text-sm font-black uppercase text-white shadow-lg active:scale-95"
      >
        <FileDown className="h-5 w-5" />
        <span>{text('Save PDF / Print Statement', 'PDF / ප්‍රින්ට්')}</span>
      </button>
    </section>
  );

  const renderSummaryView = () => (
    <section className="space-y-4">
      {renderTopNav('Summary')}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black">{text('Inventory Book', 'ස්ටොක් පොත')}</h2>
            <p className="text-xs font-bold text-slate-400">{inventoryRows.length} {text('items', 'අයිතම')}</p>
          </div>
          <button
            type="button"
            onClick={printStatement}
            className="grid h-11 w-11 place-items-center rounded-xl bg-violet-700 text-white active:scale-95"
            aria-label="Print statement"
          >
            <Printer className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-3">
          {inventoryRows.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-xs font-bold text-slate-400">
              {text('No stock records yet', 'ස්ටොක් සටහන් නැත')}
            </div>
          ) : (
            inventoryRows.map(item => (
              <div key={item.itemName} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-black">{item.itemName}</h3>
                    <p className="text-[11px] font-bold text-slate-400">
                      {text('Buy', 'ගැනුම්')} {formatCurrency(item.avgBuy)} / {text('Sell', 'විකිණුම්')} {formatCurrency(item.avgSell)}
                    </p>
                  </div>
                  <span className={item.stockQty >= 0 ? 'text-sm font-black text-emerald-600' : 'text-sm font-black text-rose-600'}>
                    {item.stockQty.toLocaleString()} {item.itemUnit}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] font-bold">
                  <span className="rounded-lg bg-slate-100 p-2 dark:bg-slate-850/50">{text('Bought', 'ගත්')}: {item.purchasedQty.toLocaleString()} {item.itemUnit}</span>
                  <span className="rounded-lg bg-slate-100 p-2 dark:bg-slate-850/50">{text('Sold', 'දුන්')}: {item.soldQty.toLocaleString()} {item.itemUnit}</span>
                  <span className="rounded-lg bg-slate-100 p-2 dark:bg-slate-850/50">{text('Profit', 'ලාභය')}: {formatCurrency(item.profit)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );

  const renderSimpleView = (title, Icon, body) => (
    <section className="space-y-4">
      {renderTopNav(title)}
      <div className="rounded-3xl bg-[#241b35] p-6 text-white shadow-xl">
        <Icon className="mb-5 h-14 w-14" />
        <h2 className="text-3xl font-black">{title}</h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-violet-100">{body}</p>
      </div>
    </section>
  );

  const renderStatementContent = () => (
    <>
      <div className="receipt-header text-center mb-6">
        <h2 className="receipt-business-title font-bold uppercase">{receiptBusinessTitle}</h2>
        {receiptAddress && <p className="receipt-business-line">{receiptAddress}</p>}
        <div className="border-b border-dashed border-black my-2"></div>
        <h3 className="text-xs font-bold tracking-widest uppercase">
          {statementPrintType === 'dashboard' ? 'PROFIT STATEMENT' : 'INVENTORY SUMMARY'}
        </h3>
      </div>

      <div className="text-xs space-y-1">
        <div className="flex justify-between">
          <span>Date/Time:</span>
          <span>{formatLocalDate()} {formatLocalTime()}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total Sales:</span>
          <span>{formatCurrency(finalTotalIncome)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total Costs:</span>
          <span>{formatCurrency(totalExpenses)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Stock Value:</span>
          <span>{formatCurrency(stockValueTotal)}</span>
        </div>
      </div>

      <div className="border-b border-dashed border-black my-3"></div>

      <div className="receipt-details text-xs space-y-1">
        {inventoryRows.slice(0, 12).map(item => (
          <div key={item.itemName} className="border-b border-dashed border-black/30 pb-1">
            <div className="flex justify-between font-bold">
              <span>{item.itemName}</span>
              <span>{item.stockQty.toLocaleString()} {item.itemUnit}</span>
            </div>
            <div className="flex justify-between">
              <span>Buy {formatCurrency(item.avgBuy)} / Sell {formatCurrency(item.avgSell)}</span>
              <span>{formatCurrency(item.profit)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-b border-dashed border-black my-3"></div>

      <div className="receipt-net-total flex justify-between font-black">
        <span>NET PROFIT:</span>
        <span>{formatCurrency(netProfit)}</span>
      </div>
    </>
  );

  const renderReceiptContent = () => {
    if (!currentPrintBill) return null;

    return (
      <>
        <div className="receipt-header text-center mb-6">
          <h2 className="receipt-business-title font-bold uppercase">{receiptBusinessTitle}</h2>
          {receiptAddress && <p className="receipt-business-line">{receiptAddress}</p>}
          {receiptPhones.length > 0 && (
            <p className="receipt-business-line">Tel: {receiptPhones.join(' / ')}</p>
          )}
          <div className="border-b border-dashed border-black my-2"></div>
          <h3 className="text-xs font-bold tracking-widest uppercase">
            {currentPrintBill.type === 'credit_settlement'
              ? text('Debt Settlement', 'ණය අඩු කිරීම').toUpperCase()
              : currentPrintBill.type === 'purchase' ? t('purchase').toUpperCase() : t('sale').toUpperCase()}
          </h3>
        </div>

        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span>Date/Time:</span>
            <span>{currentPrintBill.date} {currentPrintBill.time}</span>
          </div>
          <div className="flex justify-between">
            <span>Ref ID:</span>
            <span>{currentPrintBill.id}</span>
          </div>
          {currentPrintBill.billNumber && (
            <div className="flex justify-between font-bold">
              <span>{t('billNumber')}:</span>
              <span>{currentPrintBill.billNumber}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Type:</span>
            <span className="font-bold uppercase">{txAccountType(currentPrintBill)}</span>
          </div>
          {currentPrintBill.name && (
            <div className="flex justify-between font-bold">
              <span>{txAccountType(currentPrintBill) === 'purchase' ? t('nameSupplier') : t('nameCustomer')}:</span>
              <span className="uppercase">{currentPrintBill.name}</span>
            </div>
          )}
          {currentPrintBill.phone && (
            <div className="flex justify-between">
              <span>{t('phone')}:</span>
              <span>{currentPrintBill.phone}</span>
            </div>
          )}
        </div>

        <div className="border-b border-dashed border-black my-3"></div>

        <div className="receipt-details text-xs space-y-1">
          {currentPrintBill.qty > 0 && (
            <>
              <div className="receipt-item-row">
                <div className="receipt-item-name flex justify-between font-bold">
                  <span>{currentPrintBill.itemDescription || 'Coconut / පොල්'}</span>
                  <span>{formatCurrency(currentPrintBill.qty * currentPrintBill.price)}</span>
                </div>
                <div className="receipt-item-meta flex justify-between">
                  <span>{currentPrintBill.qty.toLocaleString()} {currentPrintBill.itemUnit || 'kg'}</span>
                  <span>@ {formatCurrency(currentPrintBill.price)}</span>
                </div>
              </div>

              <div className="border-b border-dashed border-black/30 my-2"></div>

              <div className="flex justify-between font-semibold">
                <span>{t('grossTotal')}:</span>
                <span>{formatCurrency(currentPrintBill.qty * currentPrintBill.price)}</span>
              </div>
            </>
          )}

          {currentPrintBill.adjustment > 0 && (
            <div className="flex justify-between text-[11px]">
              <span>
                {currentPrintBill.adjustmentType === 'add' ? t('addPrevBalance') : t('subAdvance')}
              </span>
              <span>{formatCurrency(currentPrintBill.adjustment)}</span>
            </div>
          )}

          {getSettlement(currentPrintBill) > 0 && (
            <div className="flex justify-between text-[11px] font-bold">
              <span>{text('Debt Settlement', 'ණය අඩු කිරීම')}</span>
              <span>{formatCurrency(getSettlement(currentPrintBill))}</span>
            </div>
          )}
        </div>

        <div className="border-b border-dashed border-black my-3"></div>

        <div className="receipt-net-total flex justify-between font-black">
          <span>{text('NET TOTAL', 'ශුද්ධ එකතුව')}:</span>
          <span>{formatCurrency(currentPrintBill.type === 'credit_settlement' ? getSettlement(currentPrintBill) : currentPrintBill.netAmount)}</span>
        </div>

        <div className="border-b border-dashed border-black my-4"></div>

        {receiptFooterMessage && (
          <div className="receipt-footer text-center mt-6">
            <p>{receiptFooterMessage}</p>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className={`min-h-screen transition-colors duration-200 print:hidden ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        
        {/* NOTIFICATION INLINE FEEDBACK */}
        {notification && (
          <div className={`fixed top-3 left-3 right-3 sm:top-4 sm:left-auto sm:right-4 sm:max-w-md z-50 flex items-start gap-2 px-4 py-3 rounded-lg shadow-xl border transition-all duration-300 transform translate-y-0 ${
            notification.type === 'error' 
              ? 'bg-rose-700/95 text-white border-rose-500' 
              : notification.type === 'info'
                ? 'bg-sky-700/95 text-white border-sky-500'
                : 'bg-emerald-700/95 text-white border-emerald-500'
          }`}>
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span className="text-xs sm:text-sm font-medium leading-relaxed">{notification.message}</span>
          </div>
        )}

        {/* SCREEN CONTENT WRAPPER */}
        <div className="max-w-7xl mx-auto px-3 py-4 sm:px-6 lg:px-8">
          
          {/* HEADER BAR */}
          <header className="hidden md:flex md:flex-row md:items-center md:justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="shrink-0 p-2.5 bg-emerald-500/10 rounded-lg text-emerald-500 border border-emerald-500/20">
                <Sprout className="w-7 h-7" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent leading-tight">
                  {t('title')}
                </h1>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-0.5 leading-snug">
                  {t('subtitle')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'en' ? 'si' : 'en')}
                className="px-3 py-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition text-slate-650 dark:text-slate-300 shrink-0 cursor-pointer"
                title={lang === 'en' ? 'Switch to Sinhala' : 'Switch to English'}
              >
                {lang === 'en' ? 'සිංහල' : 'English'}
              </button>

              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex min-w-0 flex-1 sm:flex-none items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition cursor-pointer text-slate-650 dark:text-slate-350"
              >
                <Archive className="w-3.5 h-3.5 text-emerald-500" />
                <span className="truncate">{t('historyLogs')}</span>
                {archivedLedgers.length > 0 && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-emerald-500 text-white leading-none">
                    {archivedLedgers.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowSettings(prev => !prev)}
                className="shrink-0 p-2 rounded-lg bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition cursor-pointer text-slate-650 dark:text-slate-350"
                aria-label="Feature settings"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="shrink-0 p-2 rounded-lg bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition cursor-pointer text-slate-650 dark:text-slate-350"
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
              </button>
            </div>
          </header>

          {showSettings && (
            <section className="mb-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-xs font-black uppercase tracking-wide text-slate-700 dark:text-slate-200">
                  {text('Feature Settings', 'විශේෂාංග')}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  {text('Hide fields', 'අවශ්‍ය නැති දේ ඕෆ්')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  ['phone', text('Phone', 'දුරකථන')],
                  ['billNumber', text('Bill No', 'බිල් අංකය')],
                  ['adjustments', text('Adjust', 'ගැලපුම්')],
                  ['settlement', text('Settle', 'ණය අඩු')],
                  ['manualEntries', text('Manual', 'අතින්')],
                  ['coProducts', text('Husk Sale', 'ලෙලි විකිණුම්')],
                  ['creditLedger', text('Debt List', 'ණය ලයිස්තුව')]
                ].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFeatureSettings(prev => ({ ...prev, [key]: !prev[key] }))}
                    className={`rounded-lg border px-3 py-2 text-left text-[11px] font-bold transition ${
                      featureSettings[key]
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                        : 'border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-850/40'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase tracking-wide text-slate-700 dark:text-slate-200">
                    {text('Receipt Print', 'රිසිට් ප්‍රින්ට්')}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {text('Header / footer', 'හිස / අග')}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ['businessTitle', text('Business Title', 'ව්‍යාපාර නම')],
                    ['address', text('Address', 'ලිපිනය')],
                    ['phone1', text('Phone 1', 'දුරකථන 1')],
                    ['phone2', text('Phone 2', 'දුරකථන 2')],
                    ['phone3', text('Phone 3', 'දුරකථන 3')],
                    ['footerMessage', text('Footer Message', 'අවසාන පණිවිඩය')]
                  ].map(([key, label]) => (
                    <div key={key}>
                      <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={receiptSettings[key]}
                        onChange={(e) => setReceiptSettings(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-750 dark:text-slate-100"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {appView === 'menu' && renderMenuView()}
          {appView === 'dashboard' && renderDashboardView()}
          {appView === 'summary' && renderSummaryView()}
          {appView === 'settings' && renderSimpleView('Settings', Settings, text('Use the open settings panel above to tune fields, receipt header, phone numbers, and footer message.', 'ඉහළ settings panel එකෙන් fields සහ receipt විස්තර වෙනස් කරන්න.'))}
          {appView === 'help' && renderSimpleView('Help', HelpCircle, text('Start with SALES. Enter name, item, quantity, unit price, then print. The bill saves to the ledger automatically.', 'SALES වලින් නම, අයිතමය, ගණන, මිල ඇතුළත් කර print කරන්න.'))}
          {appView === 'about' && renderSimpleView('About', Info, text('Mobile-first Shopbook/POS for coconut and distribution stock, invoices, inventory, debt, and profit tracking.', 'පොල් සහ බෙදාහැරීම් stock, bill, ණය සහ ලාභය සදහා mobile Shopbook/POS.'))}

          {appView === 'sales' && (
          <main className="space-y-6">
            <div className={`${activeModule === 'coconuts' ? 'hidden md:block' : 'sticky'} top-0 z-20 -mx-3 bg-slate-50/95 px-3 py-2 backdrop-blur dark:bg-slate-950/95 sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none`}>
              <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-white p-1 text-xs font-black dark:border-slate-800 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => setActiveModule('coconuts')}
                  className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 transition ${
                    activeModule === 'coconuts'
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-350'
                  }`}
                >
                  <Sprout className="w-4 h-4" />
                  <span>{text('Coconuts', 'පොල්')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModule('husks')}
                  className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 transition ${
                    activeModule === 'husks'
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-350'
                  }`}
                >
                  <PackageOpen className="w-4 h-4" />
                  <span>{text('Husks', 'ලෙලි')}</span>
                </button>
              </div>
            </div>

            {activeModule === 'coconuts' ? (
              <>

            {/* MOBILE-FIRST BILL CALCULATOR */}
            <section className="mobile-calc-screen md:hidden -mx-3 -mt-4 grid grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden bg-[#4c4658] text-white shadow-xl">
              <div className="flex items-center justify-between bg-gradient-to-r from-violet-800 to-fuchsia-700 px-4 py-3">
                <div className="flex items-center gap-3">
                  {posBill.type === 'sale' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-black leading-none tracking-normal">
                        {posBill.type === 'sale' ? text('Sales', 'විකුණුම්') : text('Purchase', 'ගැනුම්')}
                      </h2>
                      <button
                        type="button"
                        onClick={() => setActiveModule('husks')}
                        className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[10px] font-black text-white ring-1 ring-white/25 active:scale-95"
                        aria-label={text('Open coconut husk page', 'පොල් ලෙලි පිටුව')}
                        title={text('Coconut Husks', 'පොල් ලෙලි')}
                      >
                        <PackageOpen className="h-3.5 w-3.5" />
                        <span>{text('Husks', 'පොල් ලෙලි')}</span>
                      </button>
                    </div>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-100">
                      {text('Bill calculator', 'බිල් කැල්කියුලේටරය')}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openAppView('menu')}
                  className="rounded-lg p-2 text-white active:scale-95"
                  aria-label="Menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>

              <div className="bg-[#dce9e8] px-3 py-2 text-slate-950">
                <div className="flex items-center justify-between gap-3">
                  <div className="relative min-w-0 flex-1">
                    <input
                      type="text"
                      value={posBill.name}
                      onChange={(e) => {
                        setPosBill(prev => ({ ...prev, name: e.target.value }));
                        setShowNameSuggestions(true);
                      }}
                      onFocus={() => setShowNameSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowNameSuggestions(false), 120)}
                      onKeyDown={handleNameKeyDown}
                      placeholder={posBill.type === 'purchase' ? t('nameSupplier') : t('nameCustomer')}
                      className="w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-black outline-none focus:ring-2 focus:ring-violet-600"
                    />
                    {renderNameSuggestions()}
                  </div>
                  <button
                    type="button"
                    onClick={() => setPosBill(prev => ({ ...prev, type: prev.type === 'sale' ? 'purchase' : 'sale' }))}
                    className={`shrink-0 rounded-lg px-3 py-2 text-xs font-black text-white ${
                      posBill.type === 'sale' ? 'bg-emerald-600' : 'bg-rose-600'
                    }`}
                  >
                    {posBill.type === 'sale' ? text('Sale', 'විකිණුම්') : text('Buy', 'ගැනුම්')}
                  </button>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg bg-slate-950/10 p-1 text-[11px] font-black">
                  <button
                    type="button"
                    onClick={() => switchPOSItemType('husk')}
                    aria-pressed={currentPosItemPreset.itemType === 'husk'}
                    className={`flex items-center justify-center gap-1.5 rounded-md px-2 py-2 transition active:scale-95 ${
                      currentPosItemPreset.itemType === 'husk'
                        ? 'bg-violet-700 text-white shadow-sm'
                        : 'bg-white/60 text-slate-700'
                    }`}
                  >
                    <PackageOpen className="h-3.5 w-3.5" />
                    <span>{text('Husks kg', 'ලෙලි kg')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => switchPOSItemType('coconut')}
                    aria-pressed={currentPosItemPreset.itemType === 'coconut'}
                    className={`flex items-center justify-center gap-1.5 rounded-md px-2 py-2 transition active:scale-95 ${
                      currentPosItemPreset.itemType === 'coconut'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white/60 text-slate-700'
                    }`}
                  >
                    <Sprout className="h-3.5 w-3.5" />
                    <span>{text('Coconuts pcs', 'පොල් pcs')}</span>
                  </button>
                </div>

                <div className="mt-2 grid grid-cols-[minmax(0,1fr)_8.5rem] gap-2">
                  <input
                    type="text"
                    value={posBill.itemDescription}
                    onChange={(e) => setPosBill(prev => ({ ...prev, itemDescription: e.target.value }))}
                    placeholder={currentPosItemPreset.itemDescription}
                    className="min-w-0 rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-xs font-black outline-none focus:ring-2 focus:ring-violet-600"
                  />
                  <input
                    type="date"
                    value={posBill.date}
                    onChange={(e) => setPosBill(prev => ({ ...prev, date: e.target.value }))}
                    className="min-w-0 rounded-lg border border-slate-300 bg-white/80 px-2 py-2 text-xs font-black outline-none focus:ring-2 focus:ring-violet-600"
                  />
                </div>

                <div className="mt-2 text-right">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-950/10 px-3 py-1 text-xs font-black uppercase text-slate-700">
                      {mobileFieldLabels[activeMobileCalcField]}
                    </span>
                    {posBill.name && (
                      <span className="text-[11px] font-black text-amber-700">
                        {formatCurrency(outstanding)}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 min-h-[38px] truncate text-4xl font-black leading-none">
                    {mobileDisplayValue}
                  </div>
                  <div className="mt-0.5 truncate text-2xl font-black leading-tight">
                    {formatCurrency(posNet)}
                  </div>
                  <div className="mt-0.5 text-[11px] font-bold text-slate-600">
                    {posQty.toLocaleString()} {posItemUnit} x {formatCurrency(posPrice)}
                    {hasPosAdjustment ? ` / ${posBill.balanceType === 'add' ? '+' : '-'} ${formatCurrency(posAdjustment)}` : ''}
                  </div>
                </div>
              </div>

              <div className="mobile-calc-keypad grid min-h-0 grid-cols-4 gap-2 p-2">
                <button
                  type="button"
                  onClick={handleMobileClearAll}
                  className="rounded-lg bg-rose-300 px-2 py-4 text-2xl font-black text-white active:scale-95"
                >
                  AC
                </button>
                <button
                  type="button"
                  onClick={handleMobileClearField}
                  className="rounded-lg bg-rose-300 px-2 py-4 text-2xl font-black text-white active:scale-95"
                >
                  C
                </button>
                <button
                  type="button"
                  onClick={handleMobilePercent}
                  className="rounded-lg bg-black px-2 py-4 text-2xl font-black text-white active:scale-95"
                >
                  %
                </button>
                <button
                  type="button"
                  onClick={handleMobileNextField}
                  className="rounded-lg bg-black px-2 py-4 text-lg font-black text-white active:scale-95"
                >
                  {text('Next', 'ඊළඟ')}
                </button>

                {['7', '8', '9'].map(key => (
                  <button key={key} type="button" onClick={() => handleMobileNumberKey(key)} className="rounded-lg bg-black py-6 text-4xl font-black text-white active:scale-95">
                    {key}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setMobileCalcField('qty')}
                  className={`rounded-lg py-6 text-sm font-black uppercase active:scale-95 ${
                    activeMobileCalcField === 'qty' ? 'bg-amber-500 text-white' : 'bg-black text-white'
                  }`}
                >
                  {mobileFieldLabels.qty}
                </button>

                {['4', '5', '6'].map(key => (
                  <button key={key} type="button" onClick={() => handleMobileNumberKey(key)} className="rounded-lg bg-black py-6 text-4xl font-black text-white active:scale-95">
                    {key}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setMobileCalcField('price')}
                  className={`rounded-lg py-6 text-sm font-black uppercase active:scale-95 ${
                    activeMobileCalcField === 'price' ? 'bg-amber-500 text-white' : 'bg-black text-white'
                  }`}
                >
                  {mobileFieldLabels.price}
                </button>

                {['1', '2', '3'].map(key => (
                  <button key={key} type="button" onClick={() => handleMobileNumberKey(key)} className="rounded-lg bg-black py-6 text-4xl font-black text-white active:scale-95">
                    {key}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => featureSettings.adjustments ? setMobileCalcField('adjustment') : handleMobileNextField()}
                  className={`rounded-lg py-6 text-sm font-black uppercase active:scale-95 ${
                    activeMobileCalcField === 'adjustment' ? 'bg-amber-500 text-white' : 'bg-black text-white'
                  }`}
                >
                  {featureSettings.adjustments ? mobileFieldLabels.adjustment : text('More', 'තව')}
                </button>

                <button type="button" onClick={() => handleMobileNumberKey('0')} className="rounded-lg bg-black py-6 text-4xl font-black text-white active:scale-95">
                  0
                </button>
                <button type="button" onClick={() => handleMobileNumberKey('.')} className="rounded-lg bg-black py-6 text-4xl font-black text-white active:scale-95">
                  .
                </button>
                <button type="button" onClick={handleMobileBackspace} className="rounded-lg bg-black py-6 text-3xl font-black text-white active:scale-95">
                  C
                </button>
                <button
                  type="button"
                  onClick={handlePrintAndCommit}
                  className="rounded-lg bg-emerald-500 py-6 text-sm font-black uppercase text-white active:scale-95"
                >
                  <Printer className="mx-auto mb-1 h-5 w-5" />
                  {text('Print', 'ප්‍රින්ට්')}
                </button>
              </div>
            </section>
             
            {/* SECTION 1: POS CALCULATOR & BILLING */}
            <section className="hidden md:block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h2 className="text-base font-extrabold tracking-wide uppercase text-slate-700 dark:text-slate-200">
                  {t('calculatorTitle')}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* POS Inputs Side */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                  
                  {/* Transaction Direction Selector */}
                  <div className="order-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      {t('direction')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPosBill(prev => ({ ...prev, type: 'purchase' }))}
                        className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg border text-sm font-bold transition cursor-pointer ${
                          posBill.type === 'purchase'
                            ? 'bg-rose-500/10 border-rose-500 text-rose-500'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-350'
                        }`}
                      >
                        <ArrowDownLeft className="w-4 h-4" />
                        <span>{t('purchase')}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPosBill(prev => ({ ...prev, type: 'sale' }))}
                        className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg border text-sm font-bold transition cursor-pointer ${
                          posBill.type === 'sale'
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-350'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                        <span>{t('sale')}</span>
                      </button>
                    </div>
                  </div>

                  <div className="order-1 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <div className="col-span-2 lg:col-span-4">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {text('Calculator Item', 'ගණනය කරන අයිතමය')}
                      </label>
                      <div className="grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-1 text-sm font-black dark:border-slate-800 dark:bg-slate-950">
                        <button
                          type="button"
                          onClick={() => switchPOSItemType('husk')}
                          aria-pressed={currentPosItemPreset.itemType === 'husk'}
                          className={`flex items-center justify-center gap-2 rounded-md px-3 py-2.5 transition cursor-pointer ${
                            currentPosItemPreset.itemType === 'husk'
                              ? 'bg-violet-700 text-white shadow-sm'
                              : 'text-slate-500 hover:bg-white dark:text-slate-350 dark:hover:bg-slate-900'
                          }`}
                        >
                          <PackageOpen className="h-4 w-4" />
                          <span>{text('Coconut Husks / kg', 'පොල් ලෙලි / kg')}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => switchPOSItemType('coconut')}
                          aria-pressed={currentPosItemPreset.itemType === 'coconut'}
                          className={`flex items-center justify-center gap-2 rounded-md px-3 py-2.5 transition cursor-pointer ${
                            currentPosItemPreset.itemType === 'coconut'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'text-slate-500 hover:bg-white dark:text-slate-350 dark:hover:bg-slate-900'
                          }`}
                        >
                          <Sprout className="h-4 w-4" />
                          <span>{text('Coconuts / pcs', 'පොල් / pcs')}</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="pos-date" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {text('Date', 'දිනය')}
                      </label>
                      <input
                        id="pos-date"
                        type="date"
                        value={posBill.date}
                        onChange={(e) => setPosBill(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-750 bg-transparent text-base font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                      />
                    </div>

                    <div>
                      <label htmlFor="pos-item" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {text('Item Description', 'අයිතම විස්තරය')}
                      </label>
                      <input
                        id="pos-item"
                        type="text"
                        value={posBill.itemDescription}
                        onChange={(e) => setPosBill(prev => ({ ...prev, itemDescription: e.target.value }))}
                        onKeyDown={handlePOSKeyDown}
                        placeholder={currentPosItemPreset.itemDescription}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-750 bg-transparent text-base font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                      />
                    </div>

                    {/* Quantity Input */}
                    <div>
                      <label htmlFor="pos-qty" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {posQtyLabel}
                      </label>
                      <input
                        id="pos-qty"
                        type="number"
                        ref={qtyInputRef}
                        value={posBill.qty}
                        onChange={(e) => setPosBill(prev => ({ ...prev, qty: e.target.value }))}
                        onKeyDown={handlePOSKeyDown}
                        onFocus={(e) => e.target.select()}
                        placeholder="0"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-750 bg-transparent text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                      />
                    </div>

                    {/* Unit Price Input */}
                    <div>
                      <label htmlFor="pos-price" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {posPriceLabel}
                      </label>
                      <input
                        id="pos-price"
                        type="number"
                        step="0.01"
                        ref={priceInputRef}
                        value={posBill.price}
                        onChange={(e) => setPosBill(prev => ({ ...prev, price: e.target.value }))}
                        onKeyDown={handlePOSKeyDown}
                        onFocus={(e) => e.target.select()}
                        placeholder="0.00"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-750 bg-transparent text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                      />
                    </div>
                  </div>

                  {/* Manual collection of customer details */}
                  <div className="order-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Name Input with Autocomplete Suggestion */}
                    <div className="relative">
                      <label htmlFor="pos-name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {posBill.type === 'purchase' ? t('nameSupplier') : t('nameCustomer')}
                      </label>
                      <input
                        id="pos-name"
                        type="text"
                        value={posBill.name}
                        onChange={(e) => {
                          setPosBill(prev => ({ ...prev, name: e.target.value }));
                          setShowNameSuggestions(true);
                        }}
                        onFocus={() => setShowNameSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowNameSuggestions(false), 120)}
                        onKeyDown={handleNameKeyDown}
                        placeholder={posBill.type === 'purchase' ? 'e.g. Kamal' : 'e.g. Nimal'}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-750 bg-transparent text-base font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                      />
                      {renderNameSuggestions()}
                      {posBill.name && (
                        <div className="text-xs font-bold mt-1.5 text-slate-455 dark:text-slate-400">
                          {t('outstanding')}: <span className={outstanding > 0 ? 'text-amber-500 font-bold' : outstanding < 0 ? 'text-emerald-500 font-bold' : 'text-slate-400'}>
                            {formatCurrency(outstanding)}
                          </span>
                          <span className="text-[10px] font-normal ml-1">
                            ({posBill.type === 'purchase' ? t('outstandingWeOwe') : t('outstandingOwedToUs')})
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Phone Input */}
                    {featureSettings.phone && (
                    <div>
                      <label htmlFor="pos-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {t('phone')}
                      </label>
                      <input
                        id="pos-phone"
                        type="text"
                        value={posBill.phone}
                        onChange={(e) => setPosBill(prev => ({ ...prev, phone: e.target.value }))}
                        onKeyDown={handlePOSKeyDown}
                        placeholder="e.g. 0771234567"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-750 bg-transparent text-base font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                      />
                    </div>
                    )}

                    {/* Bill Number Input */}
                    {featureSettings.billNumber && (
                    <div>
                      <label htmlFor="pos-billNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {t('billNumber')}
                      </label>
                      <input
                        id="pos-billNumber"
                        type="text"
                        value={posBill.billNumber}
                        onChange={(e) => setPosBill(prev => ({ ...prev, billNumber: e.target.value }))}
                        onKeyDown={handlePOSKeyDown}
                        placeholder="e.g. BILL-101"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-750 bg-transparent text-base font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                      />
                    </div>
                    )}
                  </div>

                  {/* Adjustments Panel */}
                  {featureSettings.adjustments && (
                  <div className="order-4 p-4 bg-slate-50 dark:bg-slate-850/30 rounded-lg border border-slate-200/60 dark:border-slate-800/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="shrink-0">
                        <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                          {t('adjustmentType')}
                        </span>
                        <div className="grid grid-cols-2 bg-slate-200 dark:bg-slate-900 p-0.5 rounded-lg gap-0.5 text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => setPosBill(prev => ({ ...prev, balanceType: 'add' }))}
                            className={`px-4 py-2 rounded transition cursor-pointer ${
                              posBill.balanceType === 'add'
                                ? 'bg-white dark:bg-slate-800 shadow-sm text-emerald-500'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-350'
                            }`}
                          >
                            {t('addPrevBalance')}
                          </button>
                          <button
                            type="button"
                            onClick={() => setPosBill(prev => ({ ...prev, balanceType: 'subtract' }))}
                            className={`px-4 py-2 rounded transition cursor-pointer ${
                              posBill.balanceType === 'subtract'
                                ? 'bg-white dark:bg-slate-800 shadow-sm text-rose-500'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-350'
                            }`}
                          >
                            {t('subAdvance')}
                          </button>
                        </div>
                      </div>

                      <div className="grow">
                        <label htmlFor="pos-adjustment" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                          {t('adjustmentValue')}
                        </label>
                        <input
                          id="pos-adjustment"
                          type="number"
                          ref={adjustmentInputRef}
                          value={posBill.adjustment}
                          onChange={(e) => setPosBill(prev => ({ ...prev, adjustment: e.target.value }))}
                          onKeyDown={handlePOSKeyDown}
                          onFocus={(e) => e.target.select()}
                          placeholder="0.00"
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-750 bg-transparent text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                        />
                      </div>
                    </div>
                  </div>
                  )}

                  {featureSettings.settlement && (
                    <div className="order-5 grid grid-cols-1 gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 sm:grid-cols-[1fr_auto] sm:items-end">
                      <div>
                        <label htmlFor="pos-settlement" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-300">
                          {text('Settle Debt', 'ණය අඩු කරන්න')}
                        </label>
                        <input
                          id="pos-settlement"
                          type="number"
                          step="0.01"
                          value={posBill.settlement}
                          onChange={(e) => setPosBill(prev => ({ ...prev, settlement: e.target.value }))}
                          onKeyDown={handlePOSKeyDown}
                          onFocus={(e) => e.target.select()}
                          placeholder="0.00"
                          className="w-full rounded-lg border border-amber-500/30 bg-white px-4 py-3 text-lg font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-900 dark:text-slate-100"
                        />
                      </div>
                      <div className="rounded-lg bg-white px-3 py-2 text-xs font-bold dark:bg-slate-900">
                        <span className="block text-[10px] uppercase text-slate-400">{text('After', 'ඉතිරි')}</span>
                        <span className={remainingOutstanding > 0 ? 'text-amber-600 dark:text-amber-300' : 'text-emerald-600 dark:text-emerald-300'}>
                          {formatCurrency(remainingOutstanding)}
                        </span>
                      </div>
                    </div>
                  )}

                </div>

                {/* POS Summary Panel */}
                <div className="lg:col-span-4 flex flex-col justify-between p-4 bg-slate-50 dark:bg-emerald-950/10 rounded-xl border border-emerald-500/10">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-slate-400 uppercase tracking-wider">{t('grossTotal')}:</span>
                      <span className="font-bold text-lg text-slate-800 dark:text-slate-100">{formatCurrency(posGross)}</span>
                    </div>

                    <div className="rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-sm">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">
                        {t('formula')}
                      </span>
                      <span className="mt-1 block font-bold text-base text-slate-900 dark:text-slate-100">
                        {posQty.toLocaleString()} {posItemUnit} x {formatCurrency(posPrice)} = {formatCurrency(posGross)}
                      </span>
                    </div>

                    {posAdjustment > 0 && (
                      <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase">
                        <span>
                          {posBill.balanceType === 'add' ? t('addPrevBalance') : t('subAdvance')}:
                        </span>
                        <span className={posBill.balanceType === 'add' ? 'text-emerald-500 text-sm' : 'text-rose-500 text-sm'}>
                          {posBill.balanceType === 'add' ? '+' : '-'} {formatCurrency(posAdjustment)}
                        </span>
                      </div>
                    )}

                    {posSettlement > 0 && (
                      <div className="flex justify-between items-center text-xs text-amber-600 dark:text-amber-300 font-bold uppercase">
                        <span>{text('Settlement', 'ණය අඩු')}:</span>
                        <span>- {formatCurrency(posSettlement)}</span>
                      </div>
                    )}

                    <div className="pt-4 border-t border-slate-200 dark:border-slate-850 flex flex-col">
                      <span className="text-xs text-emerald-500 font-bold uppercase tracking-wider">
                        {t('netAmount')}
                      </span>
                      <span className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-slate-50 mt-1">
                        {formatCurrency(posNet)}
                      </span>
                      {posBill.name && featureSettings.settlement && (
                        <span className="mt-1 text-xs font-bold text-slate-400">
                          {text('Remaining debt', 'ඉතිරි ණය')}: {formatCurrency(remainingOutstanding)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={handlePrintAndCommit}
                      className="w-full flex items-center justify-center gap-2 py-4 px-5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-sm uppercase tracking-wider rounded-lg transition shadow-md shadow-emerald-500/10 focus:outline-none cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>{isPaymentOnly ? text('Save Payment', 'ගෙවීම සුරකින්න') : text('Print Bill', 'ප්‍රින්ට්')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: ACTIVE LEDGER BOOK */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
              
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">
                    {t('activeLedger')} <span className="text-[10px] text-slate-400 lowercase font-normal">({activeLedger.startDate})</span>
                  </h2>
                </div>
                
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 transition cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t('closePage')}</span>
                </button>
              </div>

              {editingTxId && editTxForm && (
                <div className="border-b border-amber-500/20 bg-amber-500/10 p-4">
                  <form onSubmit={handleSaveEditedTransaction} className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black uppercase tracking-wide text-amber-700 dark:text-amber-300">
                        {text('Edit Bill', 'බිල එඩිට්')}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingTxId(null);
                          setEditTxForm(null);
                        }}
                        className="rounded border border-slate-300 px-2 py-1 text-[10px] font-bold text-slate-500 dark:border-slate-700"
                      >
                        {t('cancel')}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={editTxForm.type}
                        onChange={(e) => setEditTxForm(prev => ({ ...prev, type: e.target.value }))}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 dark:border-slate-750 dark:bg-slate-900 dark:text-slate-100"
                      >
                        <option value="purchase">{t('purchase')}</option>
                        <option value="sale">{t('sale')}</option>
                      </select>
                      <input
                        type="text"
                        value={editTxForm.name}
                        onChange={(e) => setEditTxForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={text('Name', 'නම')}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 dark:border-slate-750 dark:bg-slate-900 dark:text-slate-100"
                      />
                      <input
                        type="number"
                        value={editTxForm.qty}
                        onChange={(e) => setEditTxForm(prev => ({ ...prev, qty: e.target.value }))}
                        placeholder={t('qty')}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 dark:border-slate-750 dark:bg-slate-900 dark:text-slate-100"
                      />
                      <input
                        type="number"
                        step="0.01"
                        value={editTxForm.price}
                        onChange={(e) => setEditTxForm(prev => ({ ...prev, price: e.target.value }))}
                        placeholder={t('unitPrice')}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 dark:border-slate-750 dark:bg-slate-900 dark:text-slate-100"
                      />
                      {featureSettings.adjustments && (
                        <input
                          type="number"
                          step="0.01"
                          value={editTxForm.adjustment}
                          onChange={(e) => setEditTxForm(prev => ({ ...prev, adjustment: e.target.value }))}
                          placeholder={t('adjustment')}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 dark:border-slate-750 dark:bg-slate-900 dark:text-slate-100"
                        />
                      )}
                      {featureSettings.settlement && (
                        <input
                          type="number"
                          step="0.01"
                          value={editTxForm.settlementAmount}
                          onChange={(e) => setEditTxForm(prev => ({ ...prev, settlementAmount: e.target.value }))}
                          placeholder={text('Settle', 'ණය අඩු')}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 dark:border-slate-750 dark:bg-slate-900 dark:text-slate-100"
                        />
                      )}
                      {featureSettings.phone && (
                        <input
                          type="text"
                          value={editTxForm.phone}
                          onChange={(e) => setEditTxForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder={t('phone')}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 dark:border-slate-750 dark:bg-slate-900 dark:text-slate-100"
                        />
                      )}
                      {featureSettings.billNumber && (
                        <input
                          type="text"
                          value={editTxForm.billNumber}
                          onChange={(e) => setEditTxForm(prev => ({ ...prev, billNumber: e.target.value }))}
                          placeholder={t('billNumber')}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 dark:border-slate-750 dark:bg-slate-900 dark:text-slate-100"
                        />
                      )}
                    </div>

                    <input
                      type="text"
                      value={editTxForm.description}
                      onChange={(e) => setEditTxForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder={t('description')}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 dark:border-slate-750 dark:bg-slate-900 dark:text-slate-100"
                    />

                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-black uppercase tracking-wide text-white"
                    >
                      <Save className="h-4 w-4" />
                      <span>{text('Save Changes', 'සුරකින්න')}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Manual Entry Form Grid */}
              {featureSettings.manualEntries && (
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-850/10 border-b border-slate-200 dark:border-slate-800">
                <form onSubmit={handleAddManualEntry} className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t('manualEntry')}:
                    </span>
                    
                    {/* Select Type Buttons */}
                    <div className="grid grid-cols-3 bg-slate-200 dark:bg-slate-900 p-0.5 rounded-md text-[10px] font-bold gap-0.5 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setManualType('stock')}
                        className={`px-2.5 py-1 rounded transition cursor-pointer ${
                          manualType === 'stock' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                      >
                        {t('huskedStock')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setManualType('expense')}
                        className={`px-2.5 py-1 rounded transition cursor-pointer ${
                          manualType === 'expense' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                      >
                        {t('dailyCost')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setManualType('income')}
                        className={`px-2.5 py-1 rounded transition cursor-pointer ${
                          manualType === 'income' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                      >
                        {t('manualIncome')}
                      </button>
                    </div>
                  </div>

                  {/* Form fields based on selected type */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 items-end">
                    
                    {manualType === 'stock' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            {t('huskedQty')}
                          </label>
                          <input
                            type="number"
                            value={manualStockQty}
                            onChange={(e) => setManualStockQty(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            placeholder="e.g. 500"
                            className="w-full px-4 py-2.5 text-sm rounded border border-slate-300 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            {t('laborPrice')}
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={manualStockLabor}
                            onChange={(e) => setManualStockLabor(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            placeholder="e.g. 4.00"
                            className="w-full px-4 py-2.5 text-sm rounded border border-slate-300 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </>
                    )}

                    {manualType === 'expense' && (
                      <>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            {t('expenseDesc')}
                          </label>
                          <input
                            type="text"
                            value={manualDesc}
                            onChange={(e) => setManualDesc(e.target.value)}
                            placeholder="e.g. Loading / Transport"
                            className="w-full px-4 py-2.5 text-sm rounded border border-slate-300 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            {t('amount')}
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={manualAmount}
                            onChange={(e) => setManualAmount(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            placeholder="0.00"
                            className="w-full px-4 py-2.5 text-sm rounded border border-slate-300 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </>
                    )}

                    {manualType === 'income' && (
                      <>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            {t('incomeDesc')}
                          </label>
                          <input
                            type="text"
                            value={manualDesc}
                            onChange={(e) => setManualDesc(e.target.value)}
                            placeholder="e.g. Shell sales / Bag sales"
                            className="w-full px-4 py-2.5 text-sm rounded border border-slate-300 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            {t('amount')}
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={manualAmount}
                            onChange={(e) => setManualAmount(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            placeholder="0.00"
                            className="w-full px-4 py-2.5 text-sm rounded border border-slate-300 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-slate-850 hover:bg-slate-850 active:scale-[0.99] dark:bg-slate-700 dark:hover:bg-slate-650 text-white font-bold text-sm rounded transition cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{t('addEntry')}</span>
                      </button>
                    </div>

                  </div>
                </form>
              </div>
              )}

              {/* Physical CR Book Ledger Page */}
              <div className="bg-[#fbf8ef] p-3 dark:bg-slate-950 sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {text('Current Page', 'වත්මන් පිටුව')}
                    </span>
                    <span className="text-sm font-black text-slate-900 dark:text-slate-100">
                      {activeLedger.startDate}
                    </span>
                  </div>
                  <span className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[10px] font-black text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    {(activeLedger.transactions || []).length} {text('rows', 'පේළි')}
                  </span>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-300 bg-white shadow-inner dark:border-slate-700 dark:bg-slate-900">
                  <table className="w-full min-w-[780px] border-collapse text-left text-[11px]">
                    <thead>
                      <tr className="border-b-2 border-slate-400 bg-slate-100 text-[10px] font-black uppercase tracking-wide text-slate-600 dark:border-slate-650 dark:bg-slate-850 dark:text-slate-300">
                        <th className="w-12 border-r border-slate-300 px-2 py-2 text-center dark:border-slate-700">#</th>
                        <th className="w-24 border-r border-slate-300 px-2 py-2 dark:border-slate-700">{text('Date', 'දිනය')}</th>
                        <th className="border-r border-slate-300 px-2 py-2 dark:border-slate-700">{text('Name / Details', 'නම / විස්තර')}</th>
                        <th className="w-20 border-r border-slate-300 px-2 py-2 text-right dark:border-slate-700">{t('qty')}</th>
                        <th className="w-24 border-r border-slate-300 px-2 py-2 text-right dark:border-slate-700">{t('unitPrice')}</th>
                        <th className="w-28 border-r border-slate-300 px-2 py-2 text-right dark:border-slate-700">{t('adjustment')}</th>
                        <th className="w-28 border-r border-slate-300 px-2 py-2 text-right dark:border-slate-700">{t('netAmount')}</th>
                        <th className="w-24 px-2 py-2 text-center">{t('actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeLedger.transactions.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="px-4 py-10 text-center text-xs font-semibold text-slate-400">
                            {text('Print a bill to write the first row', 'පළමු පේළියට බිලක් ප්‍රින්ට් කරන්න')}
                          </td>
                        </tr>
                      ) : (
                        activeLedger.transactions.map((tx, index) => {
                          const adjustmentText = tx.type === 'credit_settlement'
                            ? `- ${formatCurrency(getSettlement(tx))}`
                            : tx.adjustment > 0
                              ? `${tx.adjustmentType === 'add' ? '+' : '-'} ${formatCurrency(tx.adjustment)}`
                              : '-';
                          const netDisplay = tx.type === 'credit_settlement'
                            ? formatCurrency(getSettlement(tx))
                            : tx.type === 'stock_log'
                              ? '-'
                              : formatCurrency(tx.netAmount);
                          const netClass = tx.type === 'sale' || tx.type === 'manual_income'
                            ? 'text-emerald-600 dark:text-emerald-300'
                            : tx.type === 'credit_settlement'
                              ? 'text-amber-600 dark:text-amber-300'
                              : tx.type === 'stock_log'
                                ? 'text-slate-400'
                                : 'text-rose-600 dark:text-rose-300';

                          return (
                            <tr
                              key={`book-${tx.id}`}
                              className="border-b border-slate-300 bg-white align-top font-semibold text-slate-800 last:border-b-0 dark:border-slate-750 dark:bg-slate-900 dark:text-slate-100"
                            >
                              <td className="border-r border-slate-200 px-2 py-2 text-center font-black text-slate-400 dark:border-slate-800">
                                {index + 1}
                              </td>
                              <td className="border-r border-slate-200 px-2 py-2 font-bold text-slate-500 dark:border-slate-800 dark:text-slate-400">
                                <span className="block">{tx.date}</span>
                                <span className="block text-[10px] font-semibold">{tx.time}</span>
                              </td>
                              <td className="border-r border-slate-200 px-2 py-2 dark:border-slate-800">
                                <div className="font-black leading-snug">
                                  {tx.name || tx.description}
                                </div>
                                <div className="mt-0.5 text-[10px] font-semibold leading-snug text-slate-500 dark:text-slate-400">
                                  {tx.name ? tx.description : tx.type === 'stock_log' ? t('huskedStock') : tx.type === 'credit_settlement' ? text('Debt settlement', 'ණය අඩු කිරීම') : tx.billNumber || '-'}
                                  {tx.billNumber && tx.name ? ` / ${tx.billNumber}` : ''}
                                </div>
                              </td>
                              <td className="border-r border-slate-200 px-2 py-2 text-right font-black dark:border-slate-800">
                                {tx.qty > 0 ? tx.qty.toLocaleString() : '-'}
                              </td>
                              <td className="border-r border-slate-200 px-2 py-2 text-right dark:border-slate-800">
                                {tx.price > 0 ? formatCurrency(tx.price) : '-'}
                              </td>
                              <td className="border-r border-slate-200 px-2 py-2 text-right dark:border-slate-800">
                                {adjustmentText}
                              </td>
                              <td className={`border-r border-slate-200 px-2 py-2 text-right font-black dark:border-slate-800 ${netClass}`}>
                                {netDisplay}
                              </td>
                              <td className="px-2 py-2">
                                <div className="flex items-center justify-center gap-1">
                                  {isBillLike(tx) && (
                                    <button
                                      onClick={() => printReceipt(tx)}
                                      className="rounded border border-slate-200 p-1 text-slate-500 hover:text-emerald-600 dark:border-slate-700"
                                      title="Print Receipt"
                                      aria-label="Print receipt"
                                    >
                                      <Printer className="h-3.5 w-3.5" />
                                    </button>
                                  )}
                                  {isBillLike(tx) && (
                                    <button
                                      onClick={() => startEditTransaction(tx)}
                                      className="rounded border border-slate-200 p-1 text-slate-500 hover:text-amber-600 dark:border-slate-700"
                                      title="Edit Bill"
                                      aria-label="Edit bill"
                                    >
                                      <Pencil className="h-3.5 w-3.5" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDeleteTransaction(tx.id, tx.type, tx.qty)}
                                    className="rounded border border-slate-200 p-1 text-slate-500 hover:text-rose-600 dark:border-slate-700"
                                    title="Delete Entry"
                                    aria-label="Delete entry"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Transaction Cards */}
              <div className="hidden">
                {activeLedger.transactions.length === 0 ? (
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center text-sm text-slate-400">
                    {t('historyEmpty')}
                  </div>
                ) : (
                  activeLedger.transactions.map((tx) => (
                    <div
                      key={`mobile-${tx.id}`}
                      className={`rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm ${
                        tx.type === 'stock_log'
                          ? 'bg-emerald-500/5 dark:bg-emerald-950/20'
                          : 'bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-slate-400">
                            {tx.date} {tx.time}
                          </p>
                          <p className="mt-1 text-sm font-bold leading-snug break-words">
                            {tx.description}
                          </p>
                          {(tx.name || tx.phone || tx.billNumber) && (
                            <div className="text-[11px] text-slate-400 mt-1 space-y-0.5">
                              {tx.name && <div><span className="font-semibold text-slate-500 dark:text-slate-350">{txAccountType(tx) === 'purchase' ? t('nameSupplier') : t('nameCustomer')}:</span> {tx.name}</div>}
                              {tx.phone && <div><span className="font-semibold text-slate-500 dark:text-slate-350">{t('phone')}:</span> {tx.phone}</div>}
                              {tx.billNumber && <div><span className="font-semibold text-slate-500 dark:text-slate-350">{t('billNumber')}:</span> {tx.billNumber}</div>}
                            </div>
                          )}
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          {isBillLike(tx) && (
                            <button
                              onClick={() => printReceipt(tx)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:text-emerald-500 transition cursor-pointer text-slate-550"
                              title="Print Receipt"
                              aria-label="Print receipt"
                            >
                              <Printer className="w-4 h-4" />
                            </button>
                          )}
                          {isBillLike(tx) && (
                            <button
                              onClick={() => startEditTransaction(tx)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:text-amber-500 transition cursor-pointer text-slate-550"
                              title="Edit bill"
                              aria-label="Edit bill"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteTransaction(tx.id, tx.type, tx.qty)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:text-rose-500 transition cursor-pointer text-slate-555"
                            title="Delete Entry"
                            aria-label="Delete entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {tx.type === 'purchase' && (
                          <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-rose-500/10 text-rose-500 uppercase border border-rose-500/20">
                            {t('purchase')}
                          </span>
                        )}
                        {tx.type === 'sale' && (
                          <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-emerald-500/10 text-emerald-500 uppercase border border-emerald-500/20">
                            {t('sale')}
                          </span>
                        )}
                        {tx.type === 'credit_settlement' && (
                          <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-300 uppercase border border-amber-500/20">
                            {text('Settlement', 'ණය අඩු')}
                          </span>
                        )}
                        {tx.type === 'stock_log' && (
                          <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-emerald-500/10 text-teal-600 dark:text-emerald-400 uppercase border border-emerald-500/25">
                            {t('huskedStock')}
                          </span>
                        )}
                        {tx.type === 'daily_cost' && (
                          <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 uppercase border border-rose-500/20">
                            {t('dailyCost')}
                          </span>
                        )}
                        {tx.type === 'manual_income' && (
                          <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-sky-500/10 text-sky-500 uppercase border border-sky-500/20">
                            {t('manualIncome')}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-lg bg-slate-50 dark:bg-slate-850 p-2">
                          <span className="block text-[10px] font-bold uppercase text-slate-450 dark:text-slate-400">{t('qty')}</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">{tx.qty > 0 ? tx.qty.toLocaleString() : '-'}</span>
                        </div>
                        <div className="rounded-lg bg-slate-50 dark:bg-slate-850 p-2">
                          <span className="block text-[10px] font-bold uppercase text-slate-450 dark:text-slate-400">{t('unitPrice')}</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">{tx.price > 0 ? formatCurrency(tx.price) : '-'}</span>
                        </div>
                        <div className="rounded-lg bg-slate-50 dark:bg-slate-850 p-2">
                          <span className="block text-[10px] font-bold uppercase text-slate-450 dark:text-slate-400">{t('adjustment')}</span>
                          <span className={tx.adjustmentType === 'add' ? 'font-bold text-emerald-500' : 'font-bold text-rose-500'}>
                            {tx.adjustment > 0 ? `${tx.adjustmentType === 'add' ? '+' : '-'} ${formatCurrency(tx.adjustment)}` : '-'}
                          </span>
                        </div>
                        <div className="rounded-lg bg-slate-50 dark:bg-slate-850 p-2">
                          <span className="block text-[10px] font-bold uppercase text-slate-450 dark:text-slate-400">{t('amount')}</span>
                          {tx.type === 'credit_settlement' ? (
                            <span className="font-bold text-amber-600 dark:text-amber-300">- {formatCurrency(getSettlement(tx))}</span>
                          ) : tx.type === 'sale' || tx.type === 'manual_income' ? (
                            <span className="font-bold text-emerald-500">+ {formatCurrency(tx.netAmount)}</span>
                          ) : tx.type === 'purchase' || tx.type === 'daily_cost' ? (
                            <span className="font-bold text-rose-500">- {formatCurrency(tx.netAmount)}</span>
                          ) : (
                            <span className="font-bold">-</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Table Area */}
              <div className="hidden">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-850/50 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                      <th className="px-6 py-3">{t('time')}</th>
                      <th className="px-6 py-3">{t('description')}</th>
                      <th className="px-6 py-3">{t('type')}</th>
                      <th className="px-6 py-3 text-right">{t('qty')}</th>
                      <th className="px-6 py-3 text-right">{t('unitPrice')}</th>
                      <th className="px-6 py-3 text-right">{t('adjustment')}</th>
                      <th className="px-6 py-3 text-right text-emerald-500">{t('income')}</th>
                      <th className="px-6 py-3 text-right text-rose-500">{t('expense')}</th>
                      <th className="px-6 py-3 text-center">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 dark:divide-slate-800/80">
                    {activeLedger.transactions.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center py-10 text-xs text-slate-400">
                          {t('historyEmpty')}
                        </td>
                      </tr>
                    ) : (
                      activeLedger.transactions.map((tx) => (
                        <tr 
                          key={tx.id} 
                          className={`hover:bg-slate-50 dark:hover:bg-slate-850/40 transition-colors text-xs ${
                            tx.type === 'stock_log' ? 'opacity-85 bg-emerald-500/5' : ''
                          }`}
                        >
                          <td className="px-6 py-3 whitespace-nowrap text-slate-400 font-medium">
                            {tx.date} {tx.time}
                          </td>
                          <td className="px-6 py-3">
                            <div className="font-semibold capitalize max-w-xs truncate text-slate-800 dark:text-slate-200" title={tx.description}>
                              {tx.description}
                            </div>
                            {(tx.name || tx.phone || tx.billNumber) && (
                              <div className="text-[10px] text-slate-400 mt-0.5 space-y-0.5 font-normal">
                                {tx.name && <div><span className="font-medium text-slate-500 dark:text-slate-450">{txAccountType(tx) === 'purchase' ? t('nameSupplier') : t('nameCustomer')}:</span> {tx.name}</div>}
                                {tx.phone && <div><span className="font-medium text-slate-500 dark:text-slate-450">{t('phone')}:</span> {tx.phone}</div>}
                                {tx.billNumber && <div><span className="font-medium text-slate-500 dark:text-slate-450">{t('billNumber')}:</span> {tx.billNumber}</div>}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            {tx.type === 'purchase' && (
                              <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-rose-500/10 text-rose-500 uppercase border border-rose-500/20">
                                {t('purchase')}
                              </span>
                            )}
                            {tx.type === 'sale' && (
                              <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-500/10 text-emerald-500 uppercase border border-emerald-500/20">
                                {t('sale')}
                              </span>
                            )}
                            {tx.type === 'credit_settlement' && (
                              <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-amber-500/10 text-amber-600 dark:text-amber-300 uppercase border border-amber-500/20">
                                {text('Settlement', 'ණය අඩු')}
                              </span>
                            )}
                            {tx.type === 'stock_log' && (
                              <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-500/10 text-teal-600 dark:text-emerald-400 uppercase border border-emerald-500/25">
                                {t('huskedStock')}
                              </span>
                            )}
                            {tx.type === 'daily_cost' && (
                              <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 uppercase border border-rose-500/20">
                                {t('dailyCost')}
                              </span>
                            )}
                            {tx.type === 'manual_income' && (
                              <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-sky-500/10 text-sky-500 uppercase border border-sky-500/20">
                                {t('manualIncome')}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-3 text-right font-medium text-slate-700 dark:text-slate-200">
                            {tx.qty > 0 ? tx.qty.toLocaleString() : '-'}
                          </td>
                          <td className="px-6 py-3 text-right font-medium text-slate-405">
                            {tx.price > 0 ? formatCurrency(tx.price) : '-'}
                          </td>
                          <td className="px-6 py-3 text-right font-medium text-slate-405">
                            {tx.adjustment > 0 ? (
                              <span className={tx.adjustmentType === 'add' ? 'text-emerald-500' : 'text-rose-500'}>
                                {tx.adjustmentType === 'add' ? '+' : '-'} {formatCurrency(tx.adjustment)}
                              </span>
                            ) : '-'}
                          </td>
                          <td className="px-6 py-3 text-right font-bold text-emerald-500">
                            {tx.type === 'sale' || tx.type === 'manual_income' ? formatCurrency(tx.netAmount) : '-'}
                          </td>
                          <td className="px-6 py-3 text-right font-bold text-rose-500">
                            {tx.type === 'purchase' || tx.type === 'daily_cost' ? formatCurrency(tx.netAmount) : tx.type === 'credit_settlement' ? formatCurrency(getSettlement(tx)) : '-'}
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {isBillLike(tx) && (
                                <button
                                  onClick={() => printReceipt(tx)}
                                  className="p-1 hover:text-emerald-500 text-slate-400 dark:text-slate-500 transition cursor-pointer"
                                  title="Print Receipt"
                                >
                                  <Printer className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {isBillLike(tx) && (
                                <button
                                  onClick={() => startEditTransaction(tx)}
                                  className="p-1 hover:text-amber-500 text-slate-400 dark:text-slate-500 transition cursor-pointer"
                                  title="Edit Bill"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                  onClick={() => handleDeleteTransaction(tx.id, tx.type, tx.qty)}
                                  className="p-1 hover:text-rose-500 text-slate-400 dark:text-slate-500 transition cursor-pointer"
                                  title="Delete Entry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Structured Table Running Footer */}
              <div className="bg-slate-50 dark:bg-slate-850/10 p-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-bold">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800/80 flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-450 dark:text-slate-400 font-bold uppercase tracking-wider">{t('coconutsCollected')}</span>
                  <span className="text-lg font-extrabold text-rose-500">{totalPurchasedCoconuts.toLocaleString()} <span className="text-[10px] font-normal">pcs</span></span>
                  <span className="text-[10px] font-semibold text-slate-400">{formatCurrency(totalPurchaseAmount)}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800/80 flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-450 dark:text-slate-400 font-bold uppercase tracking-wider">{t('coconutsSold')}</span>
                  <span className="text-lg font-extrabold text-emerald-500">{totalSoldCoconuts.toLocaleString()} <span className="text-[10px] font-normal">pcs</span></span>
                  <span className="text-[10px] font-semibold text-slate-400">{formatCurrency(totalSaleAmount)}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800/80 flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-450 dark:text-slate-400 font-bold uppercase tracking-wider">{t('huskedStocks')}</span>
                  <span className="text-lg font-extrabold text-teal-600 dark:text-emerald-400">{activeLedger.huskedCoconutsCount.toLocaleString()} <span className="text-[10px] font-normal">pcs</span></span>
                  <span className="text-[10px] font-semibold text-slate-400">Labor: {formatCurrency(totalHuskingLabor)}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800/80 flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-450 dark:text-slate-400 font-bold uppercase tracking-wider">{t('ledgerBalance')}</span>
                  <span className="text-lg font-extrabold text-slate-850 dark:text-slate-100">
                    {formatCurrency(manualAndSalesIncome - totalExpenses)}
                  </span>
                  <span className="text-[9px] font-normal text-slate-400">Pre husk sales</span>
                </div>
              </div>

              {featureSettings.creditLedger && (
                <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-amber-500" />
                      <h3 className="text-xs font-black uppercase tracking-wide text-slate-700 dark:text-slate-200">
                        {text('Customer / Supplier Ledger', 'ණය ලෙජරය')}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      {partyBalances.length}
                    </span>
                  </div>

                  {partyBalances.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-xs font-semibold text-slate-400 dark:border-slate-700">
                      {text('No open debt', 'විවෘත ණය නැත')}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {partyBalances.slice(0, 9).map(item => (
                        <div key={`${item.type}-${item.name}`} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-800 dark:bg-slate-850/20">
                          <div className="min-w-0">
                            <span className="block truncate font-black text-slate-800 dark:text-slate-100">{item.name}</span>
                            <span className="text-[10px] font-semibold text-slate-400">
                              {item.type === 'purchase' ? text('We owe', 'අපි ගෙවිය යුතු') : text('Owes us', 'අපට ලැබිය යුතු')}
                            </span>
                          </div>
                          <span className="shrink-0 font-black text-amber-600 dark:text-amber-300">{formatCurrency(item.amount)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SECTION 3: PROFIT & LOSS SUMMARY */}
              <div className="p-4 bg-slate-100 dark:bg-slate-850/10 border-t border-slate-200 dark:border-slate-800">
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <h2 className="text-sm font-bold tracking-wide uppercase text-slate-700 dark:text-slate-200">
                    {t('profitLossTitle')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  
                  {/* Calculations Columns */}
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Expense Box */}
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">{t('expenseSide')}</span>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-xl font-black text-rose-500">
                          {formatCurrency(totalExpenses)}
                        </span>
                        <div className="mt-2 space-y-1 text-[11px] font-semibold text-slate-450 dark:text-slate-400">
                          <div className="flex justify-between gap-3">
                            <span>{t('qty')}</span>
                            <span>{totalPurchasedCoconuts.toLocaleString()} pcs / {formatCurrency(totalPurchaseAmount)}</span>
                          </div>
                          <div className="flex justify-between gap-3">
                            <span>{t('laborPrice')}</span>
                            <span>{formatCurrency(totalHuskingLabor)}</span>
                          </div>
                          <div className="flex justify-between gap-3">
                            <span>{t('dailyCost')}</span>
                            <span>{formatCurrency(totalOtherCosts)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Income Box */}
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">{t('incomeSide')}</span>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-xl font-black text-emerald-500">
                          {formatCurrency(finalTotalIncome)}
                        </span>
                        <div className="mt-2 space-y-1 text-[11px] font-semibold text-slate-450 dark:text-slate-400">
                          <div className="flex justify-between gap-3">
                            <span>{t('coconutsSold')}</span>
                            <span>{totalSoldCoconuts.toLocaleString()} pcs / {formatCurrency(totalSaleAmount)}</span>
                          </div>
                          <div className="flex justify-between gap-3">
                            <span>{t('coProductIncome')}</span>
                            <span>{formatCurrency(totalCoProductIncome)}</span>
                          </div>
                          <div className="flex justify-between gap-3">
                            <span>{t('manualIncome')}</span>
                            <span>{formatCurrency(totalManualIncome)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Co-Product Inputs */}
                    {featureSettings.coProducts && (
                    <div className="sm:col-span-2 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider">
                          {t('coProductIncome')}
                        </span>
                        <span className="text-xs font-bold text-emerald-500">
                          + {formatCurrency(totalCoProductIncome)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="husk-type-1" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            {t('huskType1')}
                          </label>
                          <input
                            id="husk-type-1"
                            type="number"
                            step="0.01"
                            value={coProducts.huskType1}
                            onChange={(e) => setCoProducts(prev => ({ ...prev, huskType1: e.target.value }))}
                            onFocus={(e) => e.target.select()}
                            placeholder="0.00"
                            className="w-full px-4 py-2.5 text-sm rounded border border-slate-300 dark:border-slate-750 bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="husk-type-2" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            {t('huskType2')}
                          </label>
                          <input
                            id="husk-type-2"
                            type="number"
                            step="0.01"
                            value={coProducts.huskType2}
                            onChange={(e) => setCoProducts(prev => ({ ...prev, huskType2: e.target.value }))}
                            onFocus={(e) => e.target.select()}
                            placeholder="0.00"
                            className="w-full px-4 py-2.5 text-sm rounded border border-slate-300 dark:border-slate-750 bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                    )}

                  </div>

                  {/* Prominent Profit Card */}
                  <div className="p-5 bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 text-white rounded-lg flex flex-col justify-between shadow-lg shadow-emerald-500/10">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-100">
                        {t('netProfitLoss')}
                      </span>
                    </div>

                    <div className="my-4">
                      <span className="text-3xl font-extrabold tracking-tight">
                        {formatCurrency(netProfit)}
                      </span>
                    </div>

                    <div>
                      <button
                        onClick={() => setShowResetConfirm(true)}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-950 active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider rounded transition shadow cursor-pointer"
                      >
                        {t('closePage')}
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </section>
              </>
            ) : (
              <>
                <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-emerald-500" />
                      <h2 className="text-sm font-black uppercase tracking-wide text-slate-700 dark:text-slate-200">
                        {text('Husk Calculator', 'ලෙලි ගණනය')}
                      </h2>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-300">
                      {activeHuskLedger.startDate}
                    </span>
                  </div>

                  <form onSubmit={handleSaveHuskRecord} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          {text('Husk Qty', 'ලෙලි ගණන')}
                        </label>
                        <input
                          type="number"
                          value={huskForm.qty}
                          onChange={(e) => setHuskForm(prev => ({ ...prev, qty: e.target.value }))}
                          onFocus={(e) => e.target.select()}
                          placeholder="0"
                          className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 text-lg font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-750 dark:text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          {text('Hauling Rate', 'අදින මිල')}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={huskForm.haulingRate}
                          onChange={(e) => setHuskForm(prev => ({ ...prev, haulingRate: e.target.value }))}
                          onFocus={(e) => e.target.select()}
                          placeholder="0.00"
                          className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 text-lg font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-750 dark:text-slate-100"
                        />
                      </div>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-850/20">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="uppercase text-slate-400">{text('Subtotal', 'උප එකතුව')}</span>
                        <span className="text-base text-slate-900 dark:text-slate-100">{formatCurrency(huskSubtotal)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          {text('Cutting', 'කපන්න')}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={huskForm.cuttingWages}
                          onChange={(e) => setHuskForm(prev => ({ ...prev, cuttingWages: e.target.value }))}
                          onFocus={(e) => e.target.select()}
                          placeholder="0.00"
                          className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-750 dark:text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          {text('Drying', 'වේලන')}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={huskForm.dryingWages}
                          onChange={(e) => setHuskForm(prev => ({ ...prev, dryingWages: e.target.value }))}
                          onFocus={(e) => e.target.select()}
                          placeholder="0.00"
                          className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-750 dark:text-slate-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        {text('Weight of 1,000 Husks', 'ලෙලි 1000ක කිලෝ')}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={huskForm.weight1000}
                        onChange={(e) => setHuskForm(prev => ({ ...prev, weight1000: e.target.value }))}
                        onFocus={(e) => e.target.select()}
                        placeholder="0.00"
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-3 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-750 dark:text-slate-100"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-3">
                        <span className="block text-[10px] font-bold uppercase text-rose-500">{text('Expense', 'ගිය වියදම')}</span>
                        <span className="mt-1 block text-xl font-black text-rose-600 dark:text-rose-300">{formatCurrency(huskTotalExpense)}</span>
                      </div>
                      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3">
                        <span className="block text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-300">{text('Avg Weight', 'ඇවරේජ් බර')}</span>
                        <span className="mt-1 block text-xl font-black text-emerald-700 dark:text-emerald-200">{huskAverageWeight.toFixed(3)} kg</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-black uppercase tracking-wide text-white shadow-sm transition active:scale-[0.99]"
                    >
                      <Save className="h-4 w-4" />
                      <span>{text('Save Husk Lot', 'ලෙලි සුරකින්න')}</span>
                    </button>
                  </form>
                </section>

                <section className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 p-4 dark:border-slate-800">
                    <div>
                      <h2 className="text-sm font-black uppercase tracking-wide text-slate-700 dark:text-slate-200">
                        {text('Husk Lot', 'ලෙලි පිටුව')}
                      </h2>
                      <p className="mt-0.5 text-[10px] font-semibold text-slate-400">
                        {activeHuskFinancials.totalHusks.toLocaleString()} {text('husks', 'ලෙලි')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleArchiveHuskLedger}
                      className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-500"
                    >
                      {text('Close', 'වසන්න')}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-4 text-xs font-bold">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-850/20">
                      <span className="block text-[10px] uppercase text-slate-400">{text('Total Expense', 'මුළු වියදම')}</span>
                      <span className="mt-1 block text-lg font-black text-rose-500">{formatCurrency(activeHuskFinancials.totalExpense)}</span>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-850/20">
                      <span className="block text-[10px] uppercase text-slate-400">{text('1,000 Avg', '1000 ඇවරේජ්')}</span>
                      <span className="mt-1 block text-lg font-black text-emerald-500">{activeHuskFinancials.averageWeight1000.toFixed(2)} kg</span>
                    </div>
                  </div>

                  <div className="space-y-2 p-4 pt-0">
                    {(activeHuskLedger.records || []).length === 0 ? (
                      <div className="rounded-lg border border-dashed border-slate-300 p-5 text-center text-xs font-semibold text-slate-400 dark:border-slate-700">
                        {text('No husk records', 'ලෙලි සටහන් නැත')}
                      </div>
                    ) : (
                      activeHuskLedger.records.map(record => (
                        <div key={record.id} className="rounded-lg border border-slate-200 p-3 text-xs dark:border-slate-800">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span className="block font-black text-slate-800 dark:text-slate-100">{record.qty.toLocaleString()} {text('husks', 'ලෙලි')}</span>
                              <span className="mt-0.5 block text-[10px] font-semibold text-slate-400">{record.date} {record.time}</span>
                            </div>
                            <span className="font-black text-rose-500">{formatCurrency(record.totalExpense)}</span>
                          </div>
                          <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-350">
                            <span>{text('Haul', 'අදින')}: {formatCurrency(record.transportSubtotal)}</span>
                            <span>{text('Cut', 'කපන')}: {formatCurrency(record.cuttingWages)}</span>
                            <span>{text('Dry', 'වේලන')}: {formatCurrency(record.dryingWages)}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {archivedHuskLedgers.length > 0 && (
                    <div className="border-t border-slate-200 p-4 dark:border-slate-800">
                      <h3 className="mb-2 text-[10px] font-black uppercase tracking-wide text-slate-400">
                        {text('Closed Husk Lots', 'වසා දැමූ ලෙලි')}
                      </h3>
                      <div className="space-y-2">
                        {archivedHuskLedgers.slice(0, 4).map(ledger => (
                          <div key={ledger.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold dark:bg-slate-850/20">
                            <span>{ledger.startDate} - {ledger.endDate}</span>
                            <span className="text-rose-500">{formatCurrency((ledger.financials || calculateHuskFinancials(ledger)).totalExpense)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              </>
            )}

          </main>
          )}
        </div>

        {/* RESET / CLOSE PAGE CONFIRMATION MODAL */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm print:hidden">
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-2xl">
              <div className="flex items-center gap-2 text-amber-500 mb-3">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
                  {t('archiveConfirmTitle')}
                </h3>
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-semibold">
                {t('archiveConfirmDesc')}
              </p>

              <div className="flex justify-end gap-2.5 font-bold text-[11px]">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3.5 py-2 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer text-slate-600 dark:text-slate-300"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleArchiveLedger}
                  className="px-3.5 py-2 rounded bg-emerald-500 hover:bg-emerald-600 text-white transition shadow shadow-emerald-500/10 cursor-pointer"
                >
                  {t('confirmArchive')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ARCHIVED HISTORY DRAWER / MODAL */}
        {showHistory && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm print:hidden">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full flex flex-col shadow-2xl">
              
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Archive className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-sm font-bold uppercase text-slate-700 dark:text-slate-200">{t('historyTitle')}</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  {archivedLedgers.length > 0 && (
                    <button
                      onClick={handleClearHistory}
                      className="flex items-center gap-1 px-2 py-1 text-[9px] font-bold uppercase rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 transition cursor-pointer"
                    >
                      {t('clearHistory')}
                    </button>
                  )}
                  <button
                    onClick={() => setShowHistory(false)}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-850 rounded text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {archivedLedgers.length === 0 ? (
                  <div className="text-center py-16 text-xs text-slate-400">
                    {t('historyEmpty')}
                  </div>
                ) : (
                  archivedLedgers.map((ledger) => {
                    const financials = calculateLedgerFinancials(ledger, ledger.coProducts || {});
                    const draft = archiveAdjustmentDrafts[ledger.id] || { type: 'income', description: '', amount: '' };
                    return (
                    <div 
                      key={ledger.id} 
                      className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-850/10"
                    >
                      {/* Header bar */}
                      <div className="bg-slate-100 dark:bg-slate-850 p-2.5 flex items-center justify-between gap-3 text-[10px] border-b border-slate-200 dark:border-slate-800 font-bold">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 rounded">
                            {t('closedPage')}
                          </span>
                          <span>{ledger.startDate} - {ledger.endDate} {ledger.endTime}</span>
                        </div>
                        <div>
                          <span>{t('totalCoconuts')}: {(financials.purchasedCoconuts + financials.huskedCoconuts).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Summary row */}
                      <div className="p-3 grid grid-cols-4 gap-2 text-center border-b border-slate-200 dark:border-slate-800">
                        <div className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                          <span className="block text-[8px] font-bold text-slate-455 dark:text-slate-400 uppercase">{t('coconutsCollected')}</span>
                          <span className="text-xs font-extrabold text-rose-500">{financials.purchasedCoconuts.toLocaleString()}</span>
                          <span className="block text-[8px] font-bold text-slate-500 dark:text-slate-400">{formatCurrency(financials.purchaseAmount)}</span>
                        </div>
                        <div className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                          <span className="block text-[8px] font-bold text-slate-455 dark:text-slate-400 uppercase">{t('coconutsSold')}</span>
                          <span className="text-xs font-extrabold text-emerald-500">{financials.soldCoconuts.toLocaleString()}</span>
                          <span className="block text-[8px] font-bold text-slate-500 dark:text-slate-400">{formatCurrency(financials.saleAmount)}</span>
                        </div>
                        <div className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                          <span className="block text-[8px] font-bold text-slate-455 dark:text-slate-400 uppercase">{t('huskedStocks')}</span>
                          <span className="text-xs font-extrabold text-teal-600 dark:text-emerald-400">{financials.huskedCoconuts.toLocaleString()}</span>
                          <span className="block text-[8px] font-bold text-slate-500 dark:text-slate-400">Labor {formatCurrency(financials.huskingLabor)}</span>
                        </div>
                        <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20 flex flex-col justify-center">
                          <span className="block text-[8px] font-bold uppercase opacity-85">{t('archivedProfit')}</span>
                          <span className="text-xs font-black">{formatCurrency(financials.netProfit)}</span>
                        </div>
                      </div>

                      <div className="border-b border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                        <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-wide">
                          <span className="text-slate-400">{text('Delayed P&L', 'ප්‍රමාද ලාභ/වියදම්')}</span>
                          <span className={financials.delayedIncome - financials.delayedExpense >= 0 ? 'text-emerald-500' : 'text-rose-500'}>
                            {formatCurrency(financials.delayedIncome - financials.delayedExpense)}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[110px_1fr_110px_auto]">
                          <select
                            value={draft.type}
                            onChange={(e) => handleArchivedAdjustmentChange(ledger.id, 'type', e.target.value)}
                            className="rounded border border-slate-300 bg-transparent px-2 py-2 text-xs font-bold dark:border-slate-700"
                          >
                            <option value="income">{t('income')}</option>
                            <option value="expense">{t('expense')}</option>
                          </select>
                          <input
                            type="text"
                            value={draft.description}
                            onChange={(e) => handleArchivedAdjustmentChange(ledger.id, 'description', e.target.value)}
                            placeholder={t('description')}
                            className="rounded border border-slate-300 bg-transparent px-2 py-2 text-xs font-bold dark:border-slate-700"
                          />
                          <input
                            type="number"
                            step="0.01"
                            value={draft.amount}
                            onChange={(e) => handleArchivedAdjustmentChange(ledger.id, 'amount', e.target.value)}
                            placeholder="0.00"
                            className="rounded border border-slate-300 bg-transparent px-2 py-2 text-xs font-bold dark:border-slate-700"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddArchivedAdjustment(ledger.id)}
                            className="rounded bg-emerald-500 px-3 py-2 text-xs font-black text-white"
                          >
                            {text('Add', 'එකතු')}
                          </button>
                        </div>
                      </div>

                      {/* Transaction breakdown details */}
                      <div className="p-3">
                        <h4 className="text-[9px] font-bold text-slate-400 uppercase mb-1.5">{t('transactionsLog')}:</h4>
                        <div className="max-h-36 overflow-y-auto space-y-1 border border-slate-200 dark:border-slate-800 rounded p-2 bg-white dark:bg-slate-900">
                          {ledger.transactions.map((tx) => (
                            <div key={tx.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 text-[11px] border-b border-slate-100 dark:border-slate-850/80 last:border-0 pb-1 pt-1 font-semibold">
                              <div className="flex flex-col min-w-0">
                                <div className="flex items-start gap-1.5 text-slate-800 dark:text-slate-200">
                                  <span className="text-slate-400 font-mono shrink-0 text-[10px]">{tx.time}</span>
                                  <span className="break-words">{tx.description}</span>
                                </div>
                                {(tx.name || tx.phone || tx.billNumber) && (
                                  <div className="text-[9px] text-slate-400 pl-8 flex flex-wrap gap-x-2 mt-0.5 font-normal">
                                    {tx.name && <span>{txAccountType(tx) === 'purchase' ? t('nameSupplier') : t('nameCustomer')}: {tx.name}</span>}
                                    {tx.phone && <span>{t('phone')}: {tx.phone}</span>}
                                    {tx.billNumber && <span>{t('billNumber')}: {tx.billNumber}</span>}
                                  </div>
                                )}
                              </div>
                              <div className="flex justify-end gap-2 shrink-0 sm:pt-0.5">
                                {tx.type === 'purchase' || tx.type === 'daily_cost' ? (
                                  <span className="text-rose-500 font-bold">- {formatCurrency(tx.netAmount)}</span>
                                ) : (
                                  <span className="text-emerald-500 font-bold">+ {formatCurrency(tx.netAmount)}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                    );
                  })
                )}
              </div>

            </div>
          </div>
        )}

      </div>

      {showReceiptPreview && currentPrintBill && (
        <div className="receipt-preview-overlay fixed inset-0 z-[70] bg-slate-950/90 p-3 text-white print:hidden">
          <div className="mx-auto flex h-full max-w-md flex-col">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-sm font-black uppercase tracking-wide">
                {text('Receipt Preview', 'රිසිට් පෙරදසුන')}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleReceiptOutput(true)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-950 shadow-lg active:scale-95"
                  aria-label={text('Save PDF', 'PDF සුරකින්න')}
                  title={text('Save PDF', 'PDF සුරකින්න')}
                >
                  <FileDown className="h-5 w-5" />
                  <span className="sr-only">{text('Save PDF', 'PDF සුරකින්න')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleReceiptOutput(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-white shadow-lg active:scale-95"
                  aria-label={text('Print', 'ප්‍රින්ට්')}
                  title={text('Print', 'ප්‍රින්ට්')}
                >
                  <Printer className="h-5 w-5" />
                  <span className="sr-only">{text('Print', 'ප්‍රින්ට්')}</span>
                </button>
                <button
                  type="button"
                  onClick={closeReceiptPreview}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 active:scale-95"
                  aria-label={t('cancel')}
                  title={t('cancel')}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">{t('cancel')}</span>
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-auto rounded-xl bg-slate-200 p-4 shadow-inner">
              <div className="receipt-preview-paper bg-white text-black shadow-xl">
                {renderReceiptContent()}
              </div>
            </div>
          </div>
        </div>
      )}

      {statementPrintType && (
        <div className="hidden print:block print-receipt-container text-black bg-white" style={{ fontFamily: 'monospace' }}>
          {renderStatementContent()}
        </div>
      )}

      {/* -------------------- PRINTABLE INVOICE / RECEIPT OVERLAY -------------------- */}
      {currentPrintBill && !statementPrintType && (
        <div ref={receiptRef} className="hidden print:block print-receipt-container text-black bg-white" style={{ fontFamily: 'monospace' }}>
          
          <div className="receipt-header text-center mb-6">
            <h2 className="receipt-business-title font-bold uppercase">{receiptBusinessTitle}</h2>
            {receiptAddress && <p className="receipt-business-line">{receiptAddress}</p>}
            {receiptPhones.length > 0 && (
              <p className="receipt-business-line">Tel: {receiptPhones.join(' / ')}</p>
            )}
            <div className="border-b border-dashed border-black my-2"></div>
            <h3 className="text-xs font-bold tracking-widest uppercase">
              {currentPrintBill.type === 'credit_settlement'
                ? text('Debt Settlement', 'ණය අඩු කිරීම').toUpperCase()
                : currentPrintBill.type === 'purchase' ? t('purchase').toUpperCase() : t('sale').toUpperCase()}
            </h3>
          </div>

          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span>Date/Time:</span>
              <span>{currentPrintBill.date} {currentPrintBill.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Ref ID:</span>
              <span>{currentPrintBill.id}</span>
            </div>
            {currentPrintBill.billNumber && (
              <div className="flex justify-between font-bold">
                <span>{t('billNumber')}:</span>
                <span>{currentPrintBill.billNumber}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="font-bold uppercase">{txAccountType(currentPrintBill)}</span>
            </div>
            {currentPrintBill.name && (
              <div className="flex justify-between font-bold">
                <span>{txAccountType(currentPrintBill) === 'purchase' ? t('nameSupplier') : t('nameCustomer')}:</span>
                <span className="uppercase">{currentPrintBill.name}</span>
              </div>
            )}
            {currentPrintBill.phone && (
              <div className="flex justify-between">
                <span>{t('phone')}:</span>
                <span>{currentPrintBill.phone}</span>
              </div>
            )}
          </div>

          <div className="border-b border-dashed border-black my-3"></div>

          {/* Details Table */}
          <div className="receipt-details text-xs space-y-1">
            {currentPrintBill.qty > 0 && (
              <>
                <div className="receipt-item-row">
                  <div className="receipt-item-name flex justify-between font-bold">
                    <span>{currentPrintBill.itemDescription || 'Coconut / පොල්'}</span>
                    <span>{formatCurrency(currentPrintBill.qty * currentPrintBill.price)}</span>
                  </div>
                  <div className="receipt-item-meta flex justify-between">
                    <span>{currentPrintBill.qty.toLocaleString()} {currentPrintBill.itemUnit || 'kg'}</span>
                    <span>@ {formatCurrency(currentPrintBill.price)}</span>
                  </div>
                </div>

                <div className="border-b border-dashed border-black/30 my-2"></div>
                
                <div className="flex justify-between font-semibold">
                  <span>{t('grossTotal')}:</span>
                  <span>{formatCurrency(currentPrintBill.qty * currentPrintBill.price)}</span>
                </div>
              </>
            )}

            {currentPrintBill.adjustment > 0 && (
              <div className="flex justify-between text-[11px]">
                <span>
                  {currentPrintBill.adjustmentType === 'add' ? t('addPrevBalance') : t('subAdvance')}
                </span>
                <span>{formatCurrency(currentPrintBill.adjustment)}</span>
              </div>
            )}

            {getSettlement(currentPrintBill) > 0 && (
              <div className="flex justify-between text-[11px] font-bold">
                <span>{text('Debt Settlement', 'ණය අඩු කිරීම')}</span>
                <span>{formatCurrency(getSettlement(currentPrintBill))}</span>
              </div>
            )}
          </div>

          <div className="border-b border-dashed border-black my-3"></div>

          {/* Net Due */}
          <div className="receipt-net-total flex justify-between font-black">
            <span>{text('NET TOTAL', 'ශුද්ධ එකතුව')}:</span>
            <span>{formatCurrency(currentPrintBill.type === 'credit_settlement' ? getSettlement(currentPrintBill) : currentPrintBill.netAmount)}</span>
          </div>

          <div className="border-b border-dashed border-black my-4"></div>

          {receiptFooterMessage && (
            <div className="receipt-footer text-center mt-6">
              <p>{receiptFooterMessage}</p>
            </div>
          )}

        </div>
      )}
    </>
  );
}
