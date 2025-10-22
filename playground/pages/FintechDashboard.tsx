import { useState } from 'react';

import {
  Badge,
  Button,
  Card,
  MetricCard,
  AccountCard,
  Select,
  Sidebar,
  Table,
  Tabs,
} from '../../src/components';

export const FintechDashboard = () => {
  const [selectedAccount, setSelectedAccount] = useState('main');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');

  // Sample data
  const transactions = [
    { id: 1, date: '2024-10-20', merchant: 'Amazon Web Services', category: 'Technology', amount: -2450.00, status: 'completed' },
    { id: 2, date: '2024-10-19', merchant: 'Client Payment - Invoice #1234', category: 'Revenue', amount: 15000.00, status: 'completed' },
    { id: 3, date: '2024-10-18', merchant: 'Office Supplies Co', category: 'Operations', amount: -340.50, status: 'completed' },
    { id: 4, date: '2024-10-17', merchant: 'Marketing Campaign', category: 'Marketing', amount: -5000.00, status: 'pending' },
    { id: 5, date: '2024-10-16', merchant: 'Payroll Processing', category: 'Payroll', amount: -25000.00, status: 'completed' },
  ];

  const accountOptions = [
    { value: 'main', label: 'Main Business Account' },
    { value: 'savings', label: 'Business Savings' },
    { value: 'credit', label: 'Business Credit Line' },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f8fafc' }}>
      {/* Sidebar */}
      <Sidebar.Root>
        <Sidebar.Header>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: '0.5rem', background: '#7c3aed' }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>Origin</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Business Banking</div>
            </div>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Nav>
            <Sidebar.NavItem
              active={activeSidebarItem === 'dashboard'}
              onClick={() => setActiveSidebarItem('dashboard')}
              icon={<span>📊</span>}
            >
              Dashboard
            </Sidebar.NavItem>
            <Sidebar.NavItem
              active={activeSidebarItem === 'funding'}
              onClick={() => setActiveSidebarItem('funding')}
              icon={<span>💰</span>}
              badge="New"
            >
              Funding
            </Sidebar.NavItem>
            <Sidebar.NavItem
              active={activeSidebarItem === 'transactions'}
              onClick={() => setActiveSidebarItem('transactions')}
              icon={<span>📋</span>}
            >
              Transactions
            </Sidebar.NavItem>
            <Sidebar.NavItem
              active={activeSidebarItem === 'cards'}
              onClick={() => setActiveSidebarItem('cards')}
              icon={<span>💳</span>}
            >
              Cards
            </Sidebar.NavItem>
          </Sidebar.Nav>

          <Sidebar.Section title="Tools">
            <Sidebar.Nav>
              <Sidebar.NavItem
                icon={<span>📈</span>}
                onClick={() => setActiveSidebarItem('analytics')}
              >
                Analytics
              </Sidebar.NavItem>
              <Sidebar.NavItem
                icon={<span>⚙️</span>}
                onClick={() => setActiveSidebarItem('settings')}
              >
                Settings
              </Sidebar.NavItem>
            </Sidebar.Nav>
          </Sidebar.Section>
        </Sidebar.Content>
        <Sidebar.Footer>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbd5e1' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>John Doe</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Acme Corp</div>
            </div>
          </div>
        </Sidebar.Footer>
      </Sidebar.Root>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1e293b' }}>
              Business Dashboard
            </h1>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Select
                value={selectedAccount}
                onChange={setSelectedAccount}
                options={accountOptions}
                placeholder="Select account"
                style={{ width: '220px' }}
              />
              <Button variant="primary">
                New Transaction
              </Button>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <MetricCard
            label="Available Balance"
            value="$125,430"
            trend="up"
            trendValue="+12.3%"
            icon="💵"
          />
          <MetricCard
            label="Monthly Revenue"
            value="$48,250"
            trend="up"
            trendValue="+8.2%"
            icon="📈"
          />
          <MetricCard
            label="Monthly Expenses"
            value="$32,790"
            trend="down"
            trendValue="-5.4%"
            icon="📉"
          />
          <MetricCard
            label="Pending Transactions"
            value="12"
            subValue="$5,000 total"
            icon="⏳"
          />
        </div>

        {/* Tabs Content */}
        <Card style={{ marginBottom: '2rem' }}>
          <Tabs.Root value={selectedTab} onValueChange={setSelectedTab}>
            <Tabs.List>
              <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
              <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
              <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="overview">
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
                  Recent Transactions
                </h3>
                <Table.Root hoverable>
                  <Table.Head>
                    <Table.Row>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                      <Table.HeaderCell>Merchant</Table.HeaderCell>
                      <Table.HeaderCell>Category</Table.HeaderCell>
                      <Table.HeaderCell align="right">Amount</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {transactions.map((tx) => (
                      <Table.Row key={tx.id}>
                        <Table.Cell>{tx.date}</Table.Cell>
                        <Table.Cell>{tx.merchant}</Table.Cell>
                        <Table.Cell>
                          <Badge variant="outline" pill>{tx.category}</Badge>
                        </Table.Cell>
                        <Table.Cell align="right">
                          <span style={{
                            fontWeight: 600,
                            color: tx.amount > 0 ? '#10b981' : '#1e293b'
                          }}>
                            {tx.amount > 0 ? '+' : ''}{new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            }).format(tx.amount)}
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge
                            variant={tx.status === 'completed' ? 'success' : 'warning'}
                            size="sm"
                          >
                            {tx.status}
                          </Badge>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </div>
            </Tabs.Content>
            <Tabs.Content value="analytics">
              <div style={{ padding: '1.5rem' }}>
                <p>Analytics content would go here...</p>
              </div>
            </Tabs.Content>
            <Tabs.Content value="reports">
              <div style={{ padding: '1.5rem' }}>
                <p>Reports content would go here...</p>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </Card>

        {/* Account Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          <AccountCard
            name="Main Business Account • ****1234"
            balance="$125,430"
            change="+$5,420"
            changePercent="+4.5%"
            isPositive={true}
          />
          <AccountCard
            name="Business Credit Line • ****5678"
            balance="$50,000 available"
            change="$450,000 limit"
            isPositive={true}
          />
        </div>
      </div>
    </div>
  );
};