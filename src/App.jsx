import { useState } from 'react'
import { CheckCircle, XCircle, Plus, Trash2, BookOpen, Users, ClipboardList, ChevronDown, ChevronUp } from 'lucide-react'

// ── サンプルデータ ─────────────────────────────
const INITIAL_STUDENTS = [
  '青木 さくら', '石田 健太', '上田 みお', '江口 拓也', '大西 ひより',
  '加藤 蓮', '木村 あかり', '小林 悠斗', '佐藤 なな', '鈴木 翔',
  '田中 こころ', '中村 ゆい', '西川 大輝', '野口 はる', '林 そら',
]

const INITIAL_HOMEWORK = [
  { id: 1, title: '数学プリント①', subject: '数学', deadline: '2025-05-10', submissions: {} },
  { id: 2, title: '漢字ドリル p.30-35', subject: '国語', deadline: '2025-05-12', submissions: {} },
  { id: 3, title: '英語単語テスト準備', subject: '英語', deadline: '2025-05-15', submissions: {} },
]

const SUBJECTS = ['数学', '国語', '英語', '理科', '社会', '音楽', '美術', '体育', 'その他']

const SUBJECT_COLORS = {
  '数学': '#2d5a27',
  '国語': '#8b3a3a',
  '英語': '#1a4a6b',
  '理科': '#4a6b1a',
  '社会': '#6b4a1a',
  '音楽': '#6b1a5a',
  '美術': '#1a5a6b',
  '体育': '#5a6b1a',
  'その他': '#5a5a5a',
}

// ── コンポーネント ─────────────────────────────

function Badge({ children, color }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '999px',
      fontSize: '0.72rem',
      fontWeight: '700',
      letterSpacing: '0.05em',
      background: color + '18',
      color: color,
      border: `1px solid ${color}30`,
    }}>
      {children}
    </span>
  )
}

function StatCard({ icon, label, value, sub }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    }}>
      <div style={{
        width: 44, height: 44,
        borderRadius: '10px',
        background: 'var(--accent-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--mono)', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>{label}</div>
        {sub && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  )
}

function HomeworkCard({ hw, students, onToggle, onDelete }) {
  const [open, setOpen] = useState(false)

  const submitted = students.filter(s => hw.submissions[s] === true)
  const notSubmitted = students.filter(s => !hw.submissions[s])
  const rate = students.length > 0 ? Math.round((submitted.length / students.length) * 100) : 0
  const color = SUBJECT_COLORS[hw.subject] || '#5a5a5a'
  const isOverdue = new Date(hw.deadline) < new Date()

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      overflow: 'hidden',
      transition: 'box-shadow 0.2s',
    }}>
      {/* ヘッダー */}
      <div style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
              <Badge color={color}>{hw.subject}</Badge>
              {isOverdue && <Badge color="#c0392b">期限超過</Badge>}
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{hw.title}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
              締め切り：{hw.deadline}
            </div>
          </div>
          <button onClick={() => onDelete(hw.id)} style={{
            background: 'none', border: 'none',
            color: 'var(--text-muted)', padding: '4px',
            borderRadius: '6px',
            transition: 'color 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* 進捗バー */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              提出済み <strong style={{ color: 'var(--accent)' }}>{submitted.length}</strong> / {students.length} 人
            </span>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', fontWeight: 700, color: color }}>
              {rate}%
            </span>
          </div>
          <div style={{ height: 8, background: 'var(--surface2)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${rate}%`,
              background: color,
              borderRadius: 999,
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      </div>

      {/* 開閉ボタン */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          padding: '10px 20px',
          background: 'var(--surface2)',
          border: 'none',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          fontWeight: 600,
        }}
      >
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {open ? '閉じる' : '生徒の提出状況を見る'}
      </button>

      {/* 生徒リスト */}
      {open && (
        <div style={{ padding: '16px 20px 20px' }}>
          {/* 未提出リスト */}
          {notSubmitted.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{
                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em',
                color: 'var(--danger)', marginBottom: 8, textTransform: 'uppercase'
              }}>
                ⚠ 未提出 ({notSubmitted.length}人)
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {notSubmitted.map(s => (
                  <button key={s} onClick={() => onToggle(hw.id, s)} style={{
                    padding: '5px 12px',
                    borderRadius: '999px',
                    border: '1px solid var(--danger)',
                    background: 'var(--danger-light)',
                    color: 'var(--danger)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    transition: 'all 0.15s',
                  }}
                    title="クリックで提出済みにする"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 提出済みリスト */}
          {submitted.length > 0 && (
            <div>
              <div style={{
                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em',
                color: 'var(--accent)', marginBottom: 8, textTransform: 'uppercase'
              }}>
                ✓ 提出済み ({submitted.length}人)
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {submitted.map(s => (
                  <button key={s} onClick={() => onToggle(hw.id, s)} style={{
                    padding: '5px 12px',
                    borderRadius: '999px',
                    border: '1px solid var(--accent)',
                    background: 'var(--accent-light)',
                    color: 'var(--accent)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    transition: 'all 0.15s',
                  }}
                    title="クリックで未提出に戻す"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function AddHomeworkModal({ onAdd, onClose }) {
  const [form, setForm] = useState({ title: '', subject: '数学', deadline: '' })

  const handle = () => {
    if (!form.title || !form.deadline) return alert('タイトルと締め切りを入力してください')
    onAdd(form)
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: 'var(--surface)',
        borderRadius: '16px',
        padding: '28px',
        width: '100%',
        maxWidth: 400,
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>宿題を追加</div>

        {[
          { label: '宿題名', key: 'title', type: 'text', placeholder: '例：数学プリント②' },
          { label: '締め切り', key: 'deadline', type: 'date', placeholder: '' },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>
              {label}
            </label>
            <input
              type={type}
              placeholder={placeholder}
              value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              style={{
                width: '100%', padding: '10px 14px',
                border: '1px solid var(--border)', borderRadius: '8px',
                fontSize: '0.95rem', outline: 'none',
                background: 'var(--bg)',
              }}
            />
          </div>
        ))}

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>
            科目
          </label>
          <select
            value={form.subject}
            onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
            style={{
              width: '100%', padding: '10px 14px',
              border: '1px solid var(--border)', borderRadius: '8px',
              fontSize: '0.95rem', background: 'var(--bg)',
            }}
          >
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '11px',
            border: '1px solid var(--border)', borderRadius: '8px',
            background: 'var(--surface2)', fontSize: '0.9rem', fontWeight: 600,
          }}>
            キャンセル
          </button>
          <button onClick={handle} style={{
            flex: 1, padding: '11px',
            border: 'none', borderRadius: '8px',
            background: 'var(--accent)', color: '#fff',
            fontSize: '0.9rem', fontWeight: 600,
          }}>
            追加する
          </button>
        </div>
      </div>
    </div>
  )
}

function AddStudentModal({ onAdd, onClose }) {
  const [name, setName] = useState('')

  const handle = () => {
    if (!name.trim()) return
    onAdd(name.trim())
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: 'var(--surface)',
        borderRadius: '16px',
        padding: '28px',
        width: '100%',
        maxWidth: 360,
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>生徒を追加</div>
        <input
          type="text"
          placeholder="例：山田 太郎"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handle()}
          autoFocus
          style={{
            width: '100%', padding: '10px 14px',
            border: '1px solid var(--border)', borderRadius: '8px',
            fontSize: '0.95rem', outline: 'none',
            background: 'var(--bg)', marginBottom: 20,
          }}
        />
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '11px',
            border: '1px solid var(--border)', borderRadius: '8px',
            background: 'var(--surface2)', fontSize: '0.9rem', fontWeight: 600,
          }}>
            キャンセル
          </button>
          <button onClick={handle} style={{
            flex: 1, padding: '11px',
            border: 'none', borderRadius: '8px',
            background: 'var(--accent)', color: '#fff',
            fontSize: '0.9rem', fontWeight: 600,
          }}>
            追加する
          </button>
        </div>
      </div>
    </div>
  )
}

// ── メインアプリ ────────────────────────────────

export default function App() {
  const [tab, setTab] = useState('homework') // 'homework' | 'students'
  const [students, setStudents] = useState(INITIAL_STUDENTS)
  const [homework, setHomework] = useState(INITIAL_HOMEWORK)
  const [showAddHW, setShowAddHW] = useState(false)
  const [showAddSt, setShowAddSt] = useState(false)
  const [hwFilter, setHwFilter] = useState('all') // 'all' | subject

  const totalSubmissions = homework.reduce((acc, hw) => {
    return acc + students.filter(s => hw.submissions[s]).length
  }, 0)
  const totalPossible = homework.length * students.length
  const overallRate = totalPossible > 0 ? Math.round((totalSubmissions / totalPossible) * 100) : 0

  const notSubmittedAnywhere = students.filter(s =>
    homework.some(hw => !hw.submissions[s])
  )

  const addHomework = ({ title, subject, deadline }) => {
    setHomework(prev => [...prev, {
      id: Date.now(), title, subject, deadline,
      submissions: {}
    }])
  }

  const deleteHomework = (id) => {
    if (!confirm('この宿題を削除しますか？')) return
    setHomework(prev => prev.filter(hw => hw.id !== id))
  }

  const toggleSubmission = (hwId, studentName) => {
    setHomework(prev => prev.map(hw => {
      if (hw.id !== hwId) return hw
      return {
        ...hw,
        submissions: {
          ...hw.submissions,
          [studentName]: !hw.submissions[studentName],
        }
      }
    }))
  }

  const addStudent = (name) => {
    if (students.includes(name)) return alert('同じ名前の生徒がすでにいます')
    setStudents(prev => [...prev, name])
  }

  const removeStudent = (name) => {
    if (!confirm(`${name} を削除しますか？`)) return
    setStudents(prev => prev.filter(s => s !== name))
    setHomework(prev => prev.map(hw => {
      const subs = { ...hw.submissions }
      delete subs[name]
      return { ...hw, submissions: subs }
    }))
  }

  const subjects = [...new Set(homework.map(h => h.subject))]
  const filteredHW = hwFilter === 'all' ? homework : homework.filter(h => h.subject === hwFilter)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* ヘッダー */}
      <header style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <BookOpen size={20} color="var(--accent)" />
            <span style={{ fontWeight: 700, fontSize: '1rem' }}>宿題提出管理</span>
          </div>
          <nav style={{ display: 'flex', gap: 4 }}>
            {[
              { key: 'homework', label: '宿題一覧', icon: <ClipboardList size={15} /> },
              { key: 'students', label: '生徒管理', icon: <Users size={15} /> },
            ].map(({ key, label, icon }) => (
              <button key={key} onClick={() => setTab(key)} style={{
                padding: '7px 16px',
                border: 'none',
                borderRadius: '8px',
                background: tab === key ? 'var(--accent)' : 'transparent',
                color: tab === key ? '#fff' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.15s',
              }}>
                {icon}{label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '28px 20px' }}>
        {/* 統計カード */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
          <StatCard icon={<ClipboardList size={20} />} label="宿題数" value={homework.length} />
          <StatCard icon={<Users size={20} />} label="生徒数" value={students.length} />
          <StatCard icon={<CheckCircle size={20} />} label="全体提出率" value={`${overallRate}%`} />
          <StatCard icon={<XCircle size={20} />} label="未提出ありの生徒" value={notSubmittedAnywhere.length} sub="いずれかの宿題で未提出" />
        </div>

        {/* 宿題タブ */}
        {tab === 'homework' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['all', ...subjects].map(s => (
                  <button key={s} onClick={() => setHwFilter(s)} style={{
                    padding: '5px 14px',
                    borderRadius: '999px',
                    border: '1px solid var(--border)',
                    background: hwFilter === s ? 'var(--accent)' : 'var(--surface)',
                    color: hwFilter === s ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.8rem', fontWeight: 600,
                    transition: 'all 0.15s',
                  }}>
                    {s === 'all' ? 'すべて' : s}
                  </button>
                ))}
              </div>
              <button onClick={() => setShowAddHW(true)} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '9px 18px',
                border: 'none', borderRadius: '10px',
                background: 'var(--accent)', color: '#fff',
                fontWeight: 700, fontSize: '0.88rem',
              }}>
                <Plus size={16} /> 宿題を追加
              </button>
            </div>

            {filteredHW.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                宿題がありません。「宿題を追加」から追加してください。
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {filteredHW.map(hw => (
                  <HomeworkCard
                    key={hw.id}
                    hw={hw}
                    students={students}
                    onToggle={toggleSubmission}
                    onDelete={deleteHomework}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 生徒タブ */}
        {tab === 'students' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontWeight: 700 }}>生徒一覧 ({students.length}人)</span>
              <button onClick={() => setShowAddSt(true)} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '9px 18px',
                border: 'none', borderRadius: '10px',
                background: 'var(--accent)', color: '#fff',
                fontWeight: 700, fontSize: '0.88rem',
              }}>
                <Plus size={16} /> 生徒を追加
              </button>
            </div>

            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              overflow: 'hidden',
            }}>
              {students.map((s, i) => {
                const notSubmitted = homework.filter(hw => !hw.submissions[s])
                return (
                  <div key={s} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '14px 20px',
                    borderBottom: i < students.length - 1 ? '1px solid var(--border)' : 'none',
                    gap: 12,
                  }}>
                    <div style={{
                      width: 36, height: 36,
                      borderRadius: '50%',
                      background: 'var(--accent-light)',
                      color: 'var(--accent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '0.85rem', flexShrink: 0,
                    }}>
                      {s[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{s}</div>
                      {notSubmitted.length > 0 ? (
                        <div style={{ fontSize: '0.78rem', color: 'var(--danger)', marginTop: 2 }}>
                          未提出: {notSubmitted.map(h => h.title).join('、')}
                        </div>
                      ) : (
                        <div style={{ fontSize: '0.78rem', color: 'var(--accent)', marginTop: 2 }}>
                          すべて提出済み ✓
                        </div>
                      )}
                    </div>
                    <button onClick={() => removeStudent(s)} style={{
                      background: 'none', border: 'none',
                      color: 'var(--text-muted)', padding: '4px', borderRadius: '6px',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>

      {showAddHW && <AddHomeworkModal onAdd={addHomework} onClose={() => setShowAddHW(false)} />}
      {showAddSt && <AddStudentModal onAdd={addStudent} onClose={() => setShowAddSt(false)} />}
    </div>
  )
}
