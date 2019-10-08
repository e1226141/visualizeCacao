MBB:0084 
0x00007fb0e0119168:   90                               nop
0x00007fb0e0119169:   f2 0f 10 05 e7 ff ff ff          movsd  -0x19(%rip),%xmm0        # 0x00007fb0e0119158
0x00007fb0e0119171:   48 b8 00 00 00 00 00 00 00 00    movabs $0x0,%rax
MBB:0085 
0x00007fb0e011917b:   48 3b c7                         cmp    %rdi,%rax
0x00007fb0e011917e:   0f 8d 09 01 00 00                jge    0x00007fb0e011928d
MBB:0086 
0x00007fb0e0119184:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e011918e:   48 ba 00 00 00 00 00 00 00 00    movabs $0x0,%rdx
MBB:0087 
0x00007fb0e0119198:   48 3b d0                         cmp    %rax,%rdx
0x00007fb0e011919b:   0f 8d 20 00 00 00                jge    0x00007fb0e01191c1
MBB:0088 
0x00007fb0e01191a1:   48 be 10 00 00 00 00 00 00 00    movabs $0x10,%rsi
0x00007fb0e01191ab:   48 0f af ce                      imul   %rsi,%rcx
0x00007fb0e01191af:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e01191b9:   48 03 d6                         add    %rsi,%rdx
0x00007fb0e01191bc:   e9 d7 ff ff ff                   jmpq   0x00007fb0e0119198
MBB:0089 
0x00007fb0e01191c1:   48 ba 08 00 00 00 00 00 00 00    movabs $0x8,%rdx
0x00007fb0e01191cb:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e01191d5:   49 b8 04 00 00 00 00 00 00 00    movabs $0x4,%r8
0x00007fb0e01191df:   49 b9 05 00 00 00 00 00 00 00    movabs $0x5,%r9
0x00007fb0e01191e9:   49 ba 06 00 00 00 00 00 00 00    movabs $0x6,%r10
0x00007fb0e01191f3:   f2 0f 10 0d 55 ff ff ff          movsd  -0xab(%rip),%xmm1        # 0x00007fb0e0119150
0x00007fb0e01191fb:   f2 48 0f 2a d1                   cvtsi2sd %rcx,%xmm2
0x00007fb0e0119200:   f2 0f 5e ca                      divsd  %xmm2,%xmm1
0x00007fb0e0119204:   f2 0f 10 15 3c ff ff ff          movsd  -0xc4(%rip),%xmm2        # 0x00007fb0e0119148
0x00007fb0e011920c:   f2 0f 10 1d 2c ff ff ff          movsd  -0xd4(%rip),%xmm3        # 0x00007fb0e0119140
0x00007fb0e0119214:   f2 0f 10 25 1c ff ff ff          movsd  -0xe4(%rip),%xmm4        # 0x00007fb0e0119138
0x00007fb0e011921c:   f2 0f 10 2d 0c ff ff ff          movsd  -0xf4(%rip),%xmm5        # 0x00007fb0e0119130
0x00007fb0e0119224:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e011922e:   4c 8b d8                         mov    %rax,%r11
0x00007fb0e0119231:   4c 03 d9                         add    %rcx,%r11
0x00007fb0e0119234:   48 0f af d0                      imul   %rax,%rdx
0x00007fb0e0119238:   48 8b c2                         mov    %rdx,%rax
0x00007fb0e011923b:   48 03 c6                         add    %rsi,%rax
0x00007fb0e011923e:   48 8b ca                         mov    %rdx,%rcx
0x00007fb0e0119241:   49 03 c8                         add    %r8,%rcx
0x00007fb0e0119244:   48 8b f2                         mov    %rdx,%rsi
0x00007fb0e0119247:   49 03 f1                         add    %r9,%rsi
0x00007fb0e011924a:   49 03 d2                         add    %r10,%rdx
0x00007fb0e011924d:   f2 48 0f 2a f0                   cvtsi2sd %rax,%xmm6
0x00007fb0e0119252:   f2 0f 5e d6                      divsd  %xmm6,%xmm2
0x00007fb0e0119256:   f2 48 0f 2a f1                   cvtsi2sd %rcx,%xmm6
0x00007fb0e011925b:   f2 0f 5e de                      divsd  %xmm6,%xmm3
0x00007fb0e011925f:   f2 0f 5c d3                      subsd  %xmm3,%xmm2
0x00007fb0e0119263:   f2 48 0f 2a de                   cvtsi2sd %rsi,%xmm3
0x00007fb0e0119268:   f2 0f 5e e3                      divsd  %xmm3,%xmm4
0x00007fb0e011926c:   f2 0f 5c d4                      subsd  %xmm4,%xmm2
0x00007fb0e0119270:   f2 48 0f 2a da                   cvtsi2sd %rdx,%xmm3
0x00007fb0e0119275:   f2 0f 5e eb                      divsd  %xmm3,%xmm5
0x00007fb0e0119279:   f2 0f 5c d5                      subsd  %xmm5,%xmm2
0x00007fb0e011927d:   f2 0f 59 ca                      mulsd  %xmm2,%xmm1
0x00007fb0e0119281:   f2 0f 58 c1                      addsd  %xmm1,%xmm0
0x00007fb0e0119285:   49 8b c3                         mov    %r11,%rax
0x00007fb0e0119288:   e9 ee fe ff ff                   jmpq   0x00007fb0e011917b
MBB:0090 
0x00007fb0e011928d:   c3                               retq   
